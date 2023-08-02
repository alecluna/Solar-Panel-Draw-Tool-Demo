import React, { useRef } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import "../../Styles/animation.css";
//import { Button } from "@material-ui/core";
import "../../index.css";
//import ToggleDrawButton from "./ToggleDrawButton";

const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

const MyMap = ({ center, MapTypeId, updateSquareFootage }) => {
  // const map = useRef(null);
  const drawManager = useRef(null);
  //const [isDrawing, setIsDrawing] = useState(true);
  //const shapes = [];

  // const removeMarkers = () => {
  //   setIsDrawing(!isDrawing);
  // };

  // const handleOverlayComplete = e => {
  //   console.log(e, drawManager.current);
  //   const shape = e.overlay;
  //   shape.setMap(null);
  //   //shapes.push(shape);
  //   //deleteShapes();
  //   //console.log(shapes);
  // };

  // const deleteShapes = () => {
  //   shapes.forEach(shape => shape.setMap(null));
  // };

  const onPolygonComplete = poly => {
    if (poly) {
      const coordinates = poly.getPath().getArray();

      let paths = [];
      coordinates.forEach(path => {
        paths.push({ latitude: path.lat(), longitude: path.lng() });
      });
      let area = window.google.maps.geometry.spherical.computeArea(
        poly.getPath()
      );

      updateSquareFootage(area * 10.76);
      poly.setMap(null);
    }
  };

  return (
    <GoogleMap
      defaultZoom={21}
      mapTypeId={MapTypeId}
      tilt={0}
      defaultOptions={{
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false
      }}
      ref={map => map && map.panTo(center)}
      className="animate"
    >
      {/* <ToggleDrawButton
        mapRef={map.current}
        controlPosition={window.google.maps.ControlPosition.BOTTOM_CENTER}
      >
        <Button
          style={{
            width: "16em",
            backgroundColor: "#3c78dd",
            color: "#FFFF",
            marginBottom: 120
          }}
          variant="contained"
          className="animated animatedFadeInUp fadeInUp"
          onClick={() => removeMarkers()}
        >
          {isDrawing ? "Cancel Drawing" : "Click to Draw another shape"}
        </Button>
      </ToggleDrawButton> */}

      <DrawingManager
        ref={drawManager}
        // drawingMode={
        //   isDrawing ? window.google.maps.drawing.OverlayType.POLYGON : null
        // }
        drawingMode={window.google.maps.drawing.OverlayType.POLYGON}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
          },
          polygonOptions: {
            draggable: true,
            fillColor: "#00ffff",
            fillOpacity: 0.45,
            strokeWeight: 0,
            clickable: true,
            editable: true,
            zIndex: 1
          }
        }}
        onPolygonComplete={polygon => {
          onPolygonComplete(polygon);
        }}
      />
    </GoogleMap>
  );
};

const Map = withScriptjs(withGoogleMap(MyMap));
export default Map;
