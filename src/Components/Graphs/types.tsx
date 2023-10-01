interface LoanInfoProps {
  open: boolean;
  squareFootage: number | null;
  handleClose: () => void;
  loanCost: number;
  numberOfPanels: number;
  sysSizeKiloWatts: number;
  initialCost: number;
  averagePowerBill: number;
  offSetPowerbillPrice: number;
}

export type { LoanInfoProps };
