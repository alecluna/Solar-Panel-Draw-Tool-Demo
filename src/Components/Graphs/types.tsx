interface LoanContainerProps {
  isOpen: boolean;
  squareFootage: number | null;
  handleClose: () => void;
  loanCost: number;
  numberOfPanels: number;
  sysSizeKiloWatts: number;
  initialCost: number;
  averagePowerBill: number;
  offSetPowerbillPrice: number;
}

interface LoanDataProps
  extends Pick<
    LoanContainerProps,
    | "averagePowerBill"
    | "numberOfPanels"
    | "sysSizeKiloWatts"
    | "initialCost"
    | "offSetPowerbillPrice"
  > {
  loanCost: number;
  loanTerm: number;
  narrowSquareFootagType: () => number;
  calculateSavingsOverLife: () => number;
}

type Graph = "Pie" | "Line";

interface GraphProps {
  graphType: Graph;
  total: number;
  moneySaved: number;
  averagePowerBill: number;
  yearlyLoanCost: number;
  offSetPowerbillPrice: number;
}

interface LineChartData {
  labels: number[];
  datasets: {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
    borderWidth: number;
    fill: boolean;
    pointRadius: number;
  }[];
}

export type { LoanContainerProps, LoanDataProps, GraphProps, LineChartData };
