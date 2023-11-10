import { useRef, useState, useCallback } from "react";
import {
  LatLng,
  MapPropTypes,
  PolygonType,
  // OverlayEvent,
  DrawingManager,
  GoogleMapInterface,
  ContainerStyle,
  LatLngBounds,
} from "./types";

import {
  Autocomplete,
  DrawingManagerF,
  Polygon,
  GoogleMap,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import ErrorDialog from "../Dialogs/ErrorDialog";

const Map: React.FC<MapPropTypes> = ({
  center: { lat: latitude, lng: longitude },
  errorDialogOpen,
  setErrorDialogOpen,
  onUpdateSquareFootage,
}) => {
  const mapRef = useRef<GoogleMapInterface>();
  const polygonRefs = useRef<PolygonType[]>([]);
  const activePolygonIndex = useRef<number | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>();
  const drawingManagerRef = useRef<DrawingManager>();

  const [, setMap] = useState<GoogleMapInterface | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [polygons, setPolygons] = useState<LatLng[][]>([
    [
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
    ],
    [
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
    ],
  ]);

  const defaultCenter: LatLngBounds = {
    lat: latitude,
    lng: longitude,
  };

  const [center, setCenter] = useState<LatLngBounds | LatLng | null>(
    defaultCenter
  );
  const [libraries] = useState<Libraries>(["places", "drawing", "geometry"]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
    version: "weekly",
    id: "script-loader",
  });

  const containerStyle: ContainerStyle = {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (map: any): void => {
      mapRef.current = map;
      setMap(map);

      if (center) {
        // TODO: fix this issue with LatLngBounds
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bounds: any = new window.google.maps.LatLngBounds(center);
        console.log("bounds: ", bounds);
        mapRef?.current?.fitBounds(bounds);
      }
    },
    [center]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoadDrawingManager = useCallback((drawingManager: any): void => {
    drawingManagerRef.current = drawingManager;
  }, []);

  const onLoadPolygon: (polygon: PolygonType | any, index: number) => void = (
    polygon: PolygonType,
    index: number
  ) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index: number): void => {
    activePolygonIndex.current = index;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoadAutocomplete = useCallback((autocomplete: string | any): void => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = (): void => {
    if (autocompleteRef.current === undefined) return;

    const { geometry } = autocompleteRef.current.getPlace();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bounds: any = new window.google.maps.LatLngBounds();
    if (geometry?.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }

    mapRef?.current?.fitBounds(bounds);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onOverlayComplete = (overlayEvent: any) => {
    console.log("overlayEvent: ", overlayEvent);
    drawingManagerRef?.current?.setDrawingMode(null);

    // if (e.keycode === 27) {
    //   drawingManagerRef?.current?.setDrawingMode(null);
    //   return;
    // }

    if (overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = overlayEvent?.overlay.getPath().getArray();

      /**
       * TODO:
       * check this works
       */
      if (newPolygon?.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newPolygon.map((latLng: any) => {
          console.log("latLng: ", latLng);
          const { lat, lng } = latLng;
          if (lat !== undefined && lng !== undefined)
            return { lat: lat, lng: lng };
        });
      }

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

  const onEditPolygon = (index: number): void => {
    // TODO fix this issue with getPath() not working with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const polygonRef: any = polygonRefs.current[index];
    const path = polygonRef?.getPath();

    if (path) {
      const coordinates = path
        .getArray()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      const allPolygons = [...polygons];
      // console.log("allPolygons: ", allPolygons);
      allPolygons[index] = coordinates;
      setPolygons(allPolygons);
    }
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <ErrorDialog
        handleClose={() => setErrorDialogOpen(!errorDialogOpen)}
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

        <div className="absolute top-15 w-full">
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
