/*
 * Component contains all of the graph logic from Chartjs,
 * Passing props down from "LoanInfo.js" parent component
 */

import { Pie, Line } from "react-chartjs-2";

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

const optionsLine = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Given annual increase of 5.5% to avg. utility bill",
          fontColor: "#787878",
          fontSize: 9,
        },
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          max: 1000,
          min: 0,
          stepSize: 100,
          callback: (value) => {
            return "$" + value;
          },
        },
      },
    ],
  },
  tooltips: {
    enabled: true,
    mode: "single",
    callbacks: {
      label: (tooltipItems) => {
        return "$" + Math.round(tooltipItems.yLabel);
      },
    },
  },
  title: {
    display: true,
    text: "Avg. Monthly Bill w/out Solar vs. Monthly Loan Payment ",
  },
};

//this function is hacky, using toFixed() to persist a 2 decimal value for each iteration
const calculateYearlyBill = (averagePowerBill, saved) => {
  const anualUtilBill = [];
  const totalYearsSolar = 20;
  let curentPowerBillTrend = 0;
  let floatingPointHack = 0;
  let totalAverage = parseInt(averagePowerBill);

  // each "year", we add 5.5% to the total bill to adjust for
  // rises in utility/power costs
  for (let i = 0; i <= totalYearsSolar; i++) {
    curentPowerBillTrend = totalAverage * (0.055).toFixed(2);
    totalAverage = totalAverage + parseFloat(curentPowerBillTrend);

    floatingPointHack = totalAverage.toFixed(2);
    const moneySavedthisYear = Math.abs(floatingPointHack - parseInt(saved));
    anualUtilBill.push(moneySavedthisYear);
  }
  return anualUtilBill;
};

const labelYears = () => {
  const totalYearsSolar = 20;
  let count = 0;
  let currentYear = new Date().getFullYear(),
    years = [];

  while (count <= totalYearsSolar) {
    years.push(currentYear++);
    count++;
  }
  return years;
};

const generateSolarCost = (yearlyLoanCost) => {
  const loanCostArray = [];
  for (let i = 0; i <= 20; i++) {
    loanCostArray.push(yearlyLoanCost);
  }

  return loanCostArray;
};

const lineChartData = (
  dataWithoutSolar: number[],
  dataWithSolar: unknown[]
) => {
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

const data = (fromUtility, offSetPowerbillPrice) => {
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

const Graph = ({
  graphType,
  total,
  moneySaved,
  averagePowerBill,
  yearlyLoanCost,
  offSetPowerbillPrice,
}) => {
  const fromUtility = (1 - parseFloat(offSetPowerbillPrice)).toFixed(4);
  const dataWithoutSolar = calculateYearlyBill(averagePowerBill, 0);
  const dataWithSolar = generateSolarCost(yearlyLoanCost);

  return (
    <div style={{ height: "400px" }}>
      {graphType === "Pie" ? (
        <Pie
          data={data(fromUtility, parseFloat(offSetPowerbillPrice).toFixed(4))}
          options={optionsCircle}
        />
      ) : (
        <Line
          data={lineChartData(dataWithoutSolar, dataWithSolar)}
          options={optionsLine}
        />
      )}
    </div>
  );
};

export default Graph;
