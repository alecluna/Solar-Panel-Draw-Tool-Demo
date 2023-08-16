import { useRef, useState } from "react";
import {
  Autocomplete,
  DrawingManagerF,
  GoogleMap,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import deleteIcon from "../../assets/remove.png";

const MapComponent = ({ center: { lat, lng }, updateSquareFootage }) => {
  const mapRef = useRef();
  const polygonRefs = useRef([]);
  const activePolygonIndex = useRef();
  const autocompleteRef = useRef();
  const drawingManagerRef = useRef();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places", "drawing", "geometry"],
    version: "weekly",
    id: "script-loader",
  });

  const [polygons, setPolygons] = useState([
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
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };
  const [center, setCenter] = useState(defaultCenter);

  const containerStyle = {
    width: "100vw",
    // height: "calc(100vh - 64px)",
    height: "100vh",
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
    zIndex: 99999,
  };

  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: "#ff0000",
    strokeColor: "#ff0000",
    strokeWeight: 2,
    draggable: true,
    editable: true,
  };

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window.google?.maps?.drawing?.OverlayType?.POLYGON],
    },
  };

  const onLoadMap = (map) => {
    mapRef.current = map;
    // map.setMapTypeId(map.MapTypeId.SATELLITE);
  };

  const onLoadPolygon = (polygon, index) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index) => {
    console.log("index of clicked polygon: ", index);
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

  const onOverlayComplete = (overlayEvent) => {
    drawingManagerRef.current.setDrawingMode(null);
    if (overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

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
      console.log("allPolygons: ", allPolygons);
      allPolygons[index] = coordinates;
      setPolygons(allPolygons);
    }
  };

  console.log("activePolygonIndex: ", activePolygonIndex);
  const onPolygonComplete = (poly) => {
    if (poly) {
      const coordinates = poly.getPath().getArray();

      const paths = [];
      coordinates.forEach((path) => {
        paths.push({ latitude: path.lat(), longitude: path.lng() });
      });

      const area = window.google.maps.geometry.spherical.computeArea(
        poly.getPath()
      );

      updateSquareFootage(area * 10.76);
      poly.setMap(null);
    }
  };

  // console.log(
  //   "drawingManagerRef.current: ",
  //   drawingManagerRef.current,
  //   mapRef.current
  // );
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
        // options={{
        //   mapTypeId: mapRef?.current?.MapTypeId?.SATELLITE,
        // }}
      >
        <DrawingManagerF
          onLoad={onLoadDrawingManager}
          onOverlayComplete={onOverlayComplete}
          options={drawingManagerOptions}
        />
        {polygons.map((iterator, index) => (
          <Polygon
            key={index}
            onLoad={(event) => onLoadPolygon(event, index)}
            onMouseDown={() => onClickPolygon(index)}
            onClick={() => onClickPolygon(index)}
            onMouseUp={() => onEditPolygon(index)}
            onDragEnd={() => onEditPolygon(index)}
            options={polygonOptions}
            paths={iterator}
            draggable
            editable
          />
        ))}
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

export default MapComponent;
