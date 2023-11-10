import { GoogleMapProps } from "@react-google-maps/api";

interface LatLng {
  lat: number;
  lng: number;
}

interface LatLngBounds extends LatLng {
  fitBounds?: (bounds: LatLng | LatLngBounds) => void;
  union?: (bounds: LatLngBounds) => LatLngBounds;
  extend?: (bounds: LatLngBounds) => LatLngBounds;
  lat: number;
  lng: number;
}

type PolygonType = LatLng[];

type ContainerStyle = {
  width: string;
  height: string;
};

interface GoogleMapInterface extends GoogleMapProps {
  fitBounds: (bounds: LatLng | LatLngBounds) => void;
}

interface DrawingManager {
  setDrawingMode: (drawingMode: string | null) => string | null;
  drawingMode: string | null;
  drawingControl: boolean;
  drawingControlOptions: {
    position: string;
    drawingModes: string[];
  };
}

interface OverlayEvent {
  type: string;
  draggable: boolean;
  editable: boolean;
  fillColour: string;
  fillOpacity: number;
  overlay: {
    setMap: (map: string | null) => void;
    getPath: () => {
      getArray: () => LatLng[];
    };
  };
}

interface MapPropTypes {
  center: LatLng;
  errorDialogOpen: boolean;
  onUpdateSquareFootage: (area: number) => void;
  setErrorDialogOpen: (isOpen: boolean) => void;
}

export type {
  LatLng,
  PolygonType,
  GoogleMapInterface,
  DrawingManager,
  OverlayEvent,
  MapPropTypes,
  ContainerStyle,
  LatLngBounds,
};
