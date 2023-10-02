import LoanDialog from "../../Dialogs/LoanDialog";
import LoanData from "./LoanData";
import { LoanContainerProps } from "../types";

const LoanContainer: React.FC<LoanContainerProps> = ({
  isOpen,
  squareFootage,
  handleClose,
  loanCost,
  numberOfPanels,
  sysSizeKiloWatts,
  initialCost,
  averagePowerBill,
  offSetPowerbillPrice,
}) => {
  /**
   *
   * @returns {number} - returns a guranteed square footage number
   */
  const narrowSquareFootagType = (): number => {
    if (typeof squareFootage === "string") {
      return +squareFootage;
    }

    if (typeof squareFootage === "number") {
      return Math.round(squareFootage);
    }

    return 0;
  };

  const calculateLoanTerm = (): number => {
    const principalVal: number = loanCost;
    const termLength = -240;
    const interest: number = 0.0479 / 12;
    const loan =
      (principalVal * interest) / (1 - Math.pow(1 + interest, termLength));
    return Math.round(loan);
  };

  const calculateSavingsOverLife = (): number => {
    const calculateBill = calculateYearlyBillSum(averagePowerBill);
    const loanterm = calculateLoanTerm();
    const totalMonthlyLoan = loanterm * 240;
    const totalDifferenceInSavings = calculateBill - totalMonthlyLoan;
    return totalDifferenceInSavings;
  };

  // this is the same function from Graph.js but the client wanted this calculation to show
  // in the total amount saved card component, removed the array and just returned sum
  const calculateYearlyBillSum = (averagePowerBill: number): number => {
    const totalYearsSolar: number = 25;
    let curentPowerBillTrend: number = 0;
    let totalAverage: number = averagePowerBill * 12;

    // each "year", we add 5.5% to the total bill to adjust for
    // rises in utility/power costs
    return Array.from({ length: totalYearsSolar }).reduce(
      (runningTotal: number) => {
        curentPowerBillTrend = totalAverage * 0.055;
        totalAverage = (totalAverage * 10 + curentPowerBillTrend * 10) / 10;
        totalAverage = Math.round(totalAverage * 1e2) / 1e2; // round two decimals
        return (runningTotal * 10 + totalAverage * 10) / 10;
      },
      0
    );
  };

  const loanTerm = calculateLoanTerm();

  return (
    <>
      {isOpen && (
        <LoanDialog handleClose={handleClose}>
          <LoanData
            loanCost={loanCost}
            loanTerm={loanTerm}
            averagePowerBill={averagePowerBill}
            numberOfPanels={numberOfPanels}
            sysSizeKiloWatts={sysSizeKiloWatts}
            initialCost={initialCost}
            offSetPowerbillPrice={offSetPowerbillPrice}
            narrowSquareFootagType={narrowSquareFootagType}
            calculateSavingsOverLife={calculateSavingsOverLife}
          />
        </LoanDialog>
      )}
    </>
  );
};

export default LoanContainer;
