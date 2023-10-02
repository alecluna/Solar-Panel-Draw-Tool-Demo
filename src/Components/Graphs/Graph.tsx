/*
 * Component contains all of the graph logic from Chartjs,
 * Passing props down from "LoanInfo.js" parent component
 */
import { Pie, Line } from "react-chartjs-2";
import { Chart, registerables, Tooltip } from "chart.js";
import { GraphProps, LineChartData } from "./types";

Chart.register({ Tooltip }, ...registerables);

const optionsCircle = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: "top",
    labels: {
      boxWidth: 10,
    },
  },
  title: {
    display: true,
    text: "Electric Usage Offset",
  },
};

//this function is hacky, using toFixed() to persist a 2 decimal value for each iteration
const calculateYearlyBill = (
  averagePowerBill: number,
  saved: number
): number[] => {
  console.log("saved: ", saved);
  const anualUtilBill: number[] = [];
  const totalYearsSolar = 20;
  let curentPowerBillTrend = 0;

  // each "year", we add 5.5% to the total bill to adjust for
  // rises in utility/power costs
  for (let i = 0; i <= totalYearsSolar; i++) {
    curentPowerBillTrend = averagePowerBill * Number((0.055).toFixed(2));
    averagePowerBill = averagePowerBill + curentPowerBillTrend;

    const roundedAvg = Math.round(averagePowerBill * 1e2) / 1e2; // round two decimals
    const moneySavedthisYear = Math.abs(roundedAvg - saved);
    anualUtilBill.push(moneySavedthisYear);
  }
  return anualUtilBill;
};

const labelYears = (): number[] => {
  const totalYearsWithSolar = 20;
  const thisYear = new Date().getFullYear();

  return Array.from({ length: totalYearsWithSolar }).reduce(
    (acc: number[], _, index: number) => {
      const curYear = thisYear + index;
      acc.push(curYear);
      return acc;
    },
    []
  );
};

const buildLoanCostArray = (yearlyLoanCost: number): number[] =>
  Array(20).fill(yearlyLoanCost);

const lineChartData = (
  dataWithoutSolar: number[],
  dataWithSolar: number[]
): LineChartData => {
  return {
    labels: labelYears(),
    datasets: [
      {
        label: "Loan Payment",
        backgroundColor: "#3b78df",
        borderColor: "#3b78df",
        data: dataWithSolar,
        borderWidth: 4,
        fill: false,
        pointRadius: 0.5,
      },
      {
        label: "Without Solar",
        backgroundColor: "#ff6384",
        borderColor: "#ff6384",
        data: dataWithoutSolar,
        borderWidth: 4,
        fill: false,
        pointRadius: 0.5,
      },
    ],
  };
};

const data = (fromUtility: number, offSetPowerbillPrice: number) => {
  console.log("fromUtility", fromUtility, offSetPowerbillPrice);
  return {
    labels: ["From Utility", "From Solar"],
    datasets: [
      {
        data: [fromUtility, offSetPowerbillPrice],
        backgroundColor: ["#FF6384", "#3b78df"],
        hoverBackgroundColor: ["#FF6384", "#3b78df"],
      },
    ],
    text: "45%",
  };
};

const Graph: React.FC<GraphProps> = ({
  graphType,
  averagePowerBill,
  yearlyLoanCost,
  offSetPowerbillPrice,
}) => {
  const fromUtility = (1 - Number(offSetPowerbillPrice)).toFixed(4);

  const dataWithoutSolar: number[] = calculateYearlyBill(averagePowerBill, 0);
  const dataWithSolar: number[] = buildLoanCostArray(yearlyLoanCost);

  return (
    <div>
      {graphType === "Pie" ? (
        <Pie
          data={data(
            Number(fromUtility),
            Number(offSetPowerbillPrice.toFixed(4))
          )}
          options={optionsCircle}
        />
      ) : (
        <Line data={lineChartData(dataWithoutSolar, dataWithSolar)} />
      )}
    </div>
  );
};

export default Graph;
