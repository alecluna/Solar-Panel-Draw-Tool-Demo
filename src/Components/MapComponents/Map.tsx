import { useRef, useState } from "react";
import {
  Autocomplete,
  DrawingManagerF,
  GoogleMap,
  Polygon,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import deleteIcon from "../../assets/remove.png";
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
    height: "calc(100vh - 48px)",
  };

  const autocompleteStyle = {
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: "240px",
    height: "38px",
    padding: "0 12px",
    borderRadius: "3px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipses",
    position: "absolute",
    right: "8%",
    top: "11px",
    marginLeft: "-120px",
  };

  const deleteIconStyle = {
    cursor: "pointer",
    backgroundImage: `url(${deleteIcon})`,
    height: "24px",
    width: "24px",
    marginTop: "5px",
    backgroundColor: "#fff",
    position: "absolute",
    top: "2px",
    left: "52%",
    zIndex: 10,
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
    // mapTypeId: mapRef.current.MapTypeId.SATELLITE,
  };

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window.google?.maps?.drawing?.OverlayType?.POLYGON],
    },
  };

  const onLoadMap = (map: object) => {
    mapRef.current = map;
    // console.log("on loaded map: ", map);
    // map.setMapTypeId(map.MapTypeId.SATELLITE);
  };

  const onLoadPolygon: (polygon: PolygonType, index: number) => void = (
    polygon: PolygonType,
    index: number
  ) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index) => {
    activePolygonIndex.current = index;
  };

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const { geometry } = autocompleteRef.current.getPlace();
    const bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }
    mapRef.current.fitBounds(bounds);
  };

  const onLoadDrawingManager = (drawingManager) => {
    drawingManagerRef.current = drawingManager;
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
    const filtered = polygons.filter(
      (polygon, index) => index !== activePolygonIndex.current
    );

    setPolygons(filtered);
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
      {drawingManagerRef.current && (
        <div
          onClick={onDeleteDrawing}
          title="Delete shape"
          style={deleteIconStyle}
        ></div>
      )}
      <GoogleMap
        zoom={15}
        center={center}
        onLoad={onLoadMap}
        mapContainerStyle={containerStyle}
        onTilesLoaded={() => setCenter(null)}
        options={googleMapOptions}
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
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search New Location"
            style={autocompleteStyle}
          />
        </Autocomplete>
      </GoogleMap>
    </div>
  ) : (
    <>
      <p>Error showing map</p>
    </>
  );
};

export default Map;
