import { useRef, useState, useCallback } from "react";
import {
  LatLng,
  MapPropTypes,
  PolygonType,
  OverlayEvent,
  DrawingManager,
} from "./types";

import {
  Autocomplete,
  DrawingManagerF,
  GoogleMap,
  Polygon,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import ErrorDialog from "../Stateless/ErrorDialog";

interface KeyboardEvent {
  keycode: boolean;
}

const Map: React.FC<MapPropTypes> = ({
  center: { lat: latitude, lng: longitude },
  errorDialogOpen,
  setErrorDialogOpen,
  onUpdateSquareFootage,
}) => {
  const mapRef = useRef();
  const polygonRefs = useRef<PolygonType[]>([]);
  const activePolygonIndex = useRef<number | undefined>();
  const autocompleteRef = useRef<unknown>();
  const drawingManagerRef = useRef<DrawingManager>();

  const [map, setMap] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [polygons, setPolygons] = useState<LatLng[][]>([
    [
      { lat: undefined, lng: undefined },
      { lat: undefined, lng: undefined },
      { lat: undefined, lng: undefined },
      { lat: undefined, lng: undefined },
    ],
    [
      { lat: undefined, lng: undefined },
      { lat: undefined, lng: undefined },
      { lat: undefined, lng: undefined },
      { lat: undefined, lng: undefined },
      { lat: undefined, lng: undefined },
    ],
  ]);

  const defaultCenter: LatLng = {
    lat: latitude,
    lng: longitude,
  };

  const [center, setCenter] = useState<LatLng>(defaultCenter);
  const [libraries] = useState<Libraries>(["places", "drawing", "geometry"]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
    version: "weekly",
    id: "script-loader",
  });

  const containerStyle = {
    width: "100vw",
    height: "calc(100vh - 64px)",
  };

  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: "#ff0000",
    strokeColor: "#ff0000",
    strokeWeight: 2,
    draggable: true,
    editable: true,
  };

  const googleMapOptions = {
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: "greedy",
    mapTypeId: window?.google?.maps?.MapTypeId?.SATELLITE || "satellite",
    mapTypeControl: false,
    tilt: 0,
    rotateControl: false,
  };

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: false,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window.google?.maps?.drawing?.OverlayType?.POLYGON],
    },
  };

  const toggleDrawMode = (): void => {
    const curDrawingState = isDrawing;
    setIsDrawing(!isDrawing);

    drawingManagerRef?.current?.setDrawingMode(
      !curDrawingState ? window.google.maps.drawing.OverlayType.POLYGON : null
    );
  };

  const onLoadMap = useCallback(
    (map) => {
      console.log("map: ", map);
      mapRef.current = map;

      if (center) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
      }
    },

    [center]
  );

  const onLoadDrawingManager = useCallback(
    (drawingManager: DrawingManager): void => {
      drawingManagerRef.current = drawingManager;
    },
    []
  );

  const onLoadPolygon: (polygon: PolygonType, index: number) => void = (
    polygon: PolygonType,
    index: number
  ) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index: number): void => {
    activePolygonIndex.current = index;
  };

  const onLoadAutocomplete = useCallback((autocomplete: string): void => {
    console.log(autocomplete);
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = (): void => {
    if (autocompleteRef.current === undefined) return;

    const { geometry } = autocompleteRef.current.getPlace();

    const bounds = new window.google.maps.LatLngBounds();
    if (geometry?.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }

    mapRef?.current?.fitBounds(bounds);
  };

  // Q what does this function do?
  const onOverlayComplete = (e: KeyboardEvent, overlayEvent: OverlayEvent) => {
    console.log("overlayEvent: ", overlayEvent);
    drawingManagerRef?.current?.setDrawingMode(null);

    if (e.keycode === 27) {
      drawingManagerRef?.current?.setDrawingMode(null);
      return;
    }

    if (overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = overlayEvent?.overlay
        .getPath()
        .getArray()
        .map((latLng: LatLng) => {
          console.log("latLng: ", latLng);
          return { lat: latLng.lat(), lng: latLng.lng() };
        });

      const area =
        window.google.maps.geometry.spherical.computeArea(newPolygon);

      onUpdateSquareFootage(area * 10.76);

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];

      newPolygon.push(startPoint);
      overlayEvent.overlay?.setMap(null);
      setPolygons([...polygons, newPolygon]);
    }
  };

  const onDeleteDrawing = (): void => {
    setPolygons([]);
    setIsDrawing(false);
  };

  const onEditPolygon = (index: number) => {
    const polygonRef = polygonRefs.current[index];
    if (polygonRef) {
      const coordinates = polygonRef
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      const allPolygons = [...polygons];
      // console.log("allPolygons: ", allPolygons);
      allPolygons[index] = coordinates;
      setPolygons(allPolygons);
    }
  };

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(!errorDialogOpen)}
        title="Error with request"
        message="Whoops, something went wrong with your request, please try again"
      />
    );
  }

  return isLoaded ? (
    <div className="map-container" style={{ position: "relative" }}>
      <GoogleMap
        zoom={20}
        onLoad={onLoadMap}
        onUnmount={onUnmount}
        mapContainerStyle={containerStyle}
        onTilesLoaded={() => setCenter(null)}
        options={googleMapOptions}
        mapTypeId={google.maps.MapTypeId.SATELLITE}
      >
        <DrawingManagerF
          onLoad={onLoadDrawingManager}
          onOverlayComplete={onOverlayComplete}
          options={drawingManagerOptions}
        />
        {polygons.map((iterator, index) => {
          return (
            <Polygon
              key={index}
              onLoad={(event) => onLoadPolygon(event, index)}
              onMouseDown={() => onClickPolygon(index)}
              onMouseUp={() => onEditPolygon(index)}
              onDragEnd={() => onEditPolygon(index)}
              options={polygonOptions}
              paths={iterator}
              draggable
              editable
            />
          );
        })}

        <div className="absolute top-20 w-full">
          <div className="flex flex-wrap flex-col items-start m-12">
            <button
              className="flex-shrink-0 flex-grow-0 w-190 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-2 border border-blue-700 rounded mb-2"
              onClick={() => toggleDrawMode()}
            >
              Draw Mode: {isDrawing ? "ON" : "OFF"}
            </button>
            <button
              className="flex-shrink-0 flex-grow-0 w-190 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-2 border border-blue-700 rounded  mb-2"
              onClick={onDeleteDrawing}
              title="Delete shape"
            >
              {" "}
              Delete Drawings
            </button>
            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Search New Location"
                className="focus:-translate-y-1 focus:scale-100 duration-300 w-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mb-2"
              />
            </Autocomplete>
          </div>
        </div>
      </GoogleMap>
    </div>
  ) : (
    <>
      <p>Error showing map</p>
    </>
  );
};

export default Map;
