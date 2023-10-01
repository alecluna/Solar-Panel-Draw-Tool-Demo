type LatLng = {
  lat: number | undefined;
  lng: number | undefined;
};

type PolygonType = LatLng[];

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

export type { LatLng, PolygonType, DrawingManager, OverlayEvent, MapPropTypes };
