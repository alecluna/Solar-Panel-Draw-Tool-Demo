type UpdateAveragePowerBill = (averagePowerBill: number) => void;
type UpdateLocation = (location: Partial<string>) => void;

interface SubmitAddressInfoProps {
  updateAveragePowerBill: UpdateAveragePowerBill;
  updateLocation: UpdateLocation;
}

export type { UpdateAveragePowerBill, UpdateLocation, SubmitAddressInfoProps };
