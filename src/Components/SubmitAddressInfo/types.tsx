type UpdateAveragePowerBill = (averagePowerBill: number) => void;

type UpdateLocation = (location: Partial<string>) => void;

interface SubmitAddressInfoProps {
  updateAveragePowerBill: UpdateAveragePowerBill;
  updateLocation: UpdateLocation;
  isLoading: boolean;
}

interface Values {
  avgBill: string;
  address: string;
  city: string;
  state: string;
}

export type { Values, SubmitAddressInfoProps };
