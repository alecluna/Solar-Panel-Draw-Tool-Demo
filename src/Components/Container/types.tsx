type URLString = string;
type UpdateAveragePowerBill = (averagePowerBill: number) => void;
interface ContainerProps {
  showMapBox: boolean;
  setShowMapBox: (showMapBox: boolean) => void;
}

export type { URLString, UpdateAveragePowerBill, ContainerProps };
