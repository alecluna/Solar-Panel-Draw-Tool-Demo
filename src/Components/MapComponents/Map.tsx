import { useRef, useState, useCallback } from "react";
import {
  Autocomplete,
  DrawingManagerF,
  GoogleMap,
  Polygon,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";

import ErrorDialog from "../Stateless/ErrorDialog";

interface LatLng {
  lat: number | undefined;
  lng: number | undefined;
}

type PolygonType = LatLng[];

interface MapTypes {
  center: LatLng;
  errorDialogOpen: boolean;
  onUpdateSquareFootage: (area: number) => void;
  setErrorDialogOpen: (isOpen: boolean) => void;
}

const Map: React.FC<MapTypes> = ({
  center: { lat: latitude, lng: longitude },
  errorDialogOpen,
  setErrorDialogOpen,
  onUpdateSquareFootage,
}) => {
  const mapRef = useRef<unknown>();
  const polygonRefs = useRef<unknown[]>([]);
  const activePolygonIndex = useRef<number | undefined>();
  const autocompleteRef = useRef<unknown>();
  const drawingManagerRef = useRef();

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

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };
  const [center, setCenter] = useState(defaultCenter);
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

  const buttonStyles = {
    position: "absolute",
    top: "20px",
    width: "100%",
  };

  const autocompleteStyle = {
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: "180px",
    height: "38px",
    padding: "0 12px",
    borderRadius: "3px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipses",
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

  const toggleDrawMode = () => {
    const curDrawingState = isDrawing;
    setIsDrawing(!isDrawing);

    drawingManagerRef?.current?.setDrawingMode(
      !curDrawingState ? window.google.maps.drawing.OverlayType.POLYGON : null
    );
  };

  const onLoadMap = useCallback(
    (map: any) => {
      mapRef.current = map;

      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },

    [center]
  );

  const onLoadDrawingManager = useCallback((drawingManager: any) => {
    drawingManagerRef.current = drawingManager;
  }, []);

  const onLoadPolygon: (polygon: PolygonType, index: number) => void = (
    polygon: PolygonType,
    index: number
  ) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index) => {
    activePolygonIndex.current = index;
  };

  const onLoadAutocomplete = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = () => {
    const { geometry } = autocompleteRef.current.getPlace();

    const bounds = new window.google.maps.LatLngBounds();
    if (geometry?.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }

    mapRef.current.fitBounds(bounds);
  };

  // Q what does this function do?
  const onOverlayComplete = (overlayEvent) => {
    drawingManagerRef.current.setDrawingMode(null);
    // console.log(
    //   "overlayEvent.overlay: ",
    //   overlayEvent.overlay.getPath().getArray()
    // );
    if (overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng: any) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));

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

  const onDeleteDrawing = () => {
    setPolygons([]);
  };

  const onEditPolygon = (index) => {
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

        <div style={buttonStyles}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 12,
            }}
          >
            <button
              className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 max-[500px]:w-1/3 w-1/6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-2 border border-blue-700 rounded"
              onClick={() => toggleDrawMode()}
            >
              Draw Mode is turned: {isDrawing ? "ON" : "OFF"}
            </button>

            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Search New Location"
                className="focus:-translate-y-1 focus:scale-100 duration-300 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
            </Autocomplete>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: "45%",
            bottom: "50px",
            width: "100%",
          }}
        >
          <button
            className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 max-[500px]:w-1/3 w-1/6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-2 border border-blue-700 rounded"
            onClick={onDeleteDrawing}
            title="Delete shape"
          >
            {" "}
            Delete Drawings
          </button>
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
