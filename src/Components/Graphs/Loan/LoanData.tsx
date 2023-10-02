import { LoanDataProps } from "../types";
import CountUp from "react-countup";
import Graph from "../Graph";

import arrow from "../../../assets/right-arrow.svg";

const LoanData: React.FC<LoanDataProps> = ({
  loanTerm,
  numberOfPanels,
  initialCost,
  offSetPowerbillPrice,
  narrowSquareFootagType,
  calculateSavingsOverLife,
  averagePowerBill,
  sysSizeKiloWatts,
  loanCost,
}) => {
  return (
    <>
      <div className="p-5">
        <h2 className="text-3xl text-slate-800">
          You have selected:{"  "}
          <strong>
            <CountUp
              useEasing={true}
              end={narrowSquareFootagType()}
              duration={5}
              suffix=" sq. feet"
            />
          </strong>
        </h2>
      </div>
      <div className="flex flex-col flex-wrap justify-center p-5">
        <div className=" max-w-30em w-full h-125 shadow-md">
          <p className="text-4xl text-gray-900">
            <CountUp prefix="$" end={calculateSavingsOverLife()} duration={4} />
          </p>
          <p className="text-2xl text-gray-900">
            Estimated savings over 25 years, when comparing your avg. monthly
            power bill of <strong>${averagePowerBill}</strong> to{" "}
            <strong>${loanTerm}</strong>:{" "}
          </p>
        </div>

        <div className=" max-w-30em w-full h-125 shadow-md">
          <div style={{ width: "45%" }}>
            <p className="text-2xl text-gray-900">
              <CountUp
                useEasing={true}
                end={loanTerm}
                duration={4}
                prefix="$"
              />
            </p>
            <p>Estimated New Monthly Loan Payment </p>
          </div>

          <div>
            <img className="w-10 h-10" src={arrow} alt="arrow" />
          </div>
          <div style={{ width: "30%" }}>
            {" "}
            <p className="text-2xl text-gray-900">
              <CountUp
                useEasing={true}
                end={averagePowerBill - loanTerm}
                duration={4}
                prefix="$"
              />
            </p>
            <p>Monthly Savings </p>
          </div>
        </div>

        <div className=" max-w-30em w-full h-125 shadow-md">
          <p className="text-2xl text-gray-900">
            <CountUp
              useEasing={true}
              end={sysSizeKiloWatts}
              duration={4}
              suffix=" kW"
            />
          </p>
          <p>
            Total System Size in kW for{" "}
            <strong>{narrowSquareFootagType()}</strong> sqft roof:
          </p>
        </div>

        <div className=" max-w-30em w-full h-125 shadow-md">
          <p className="text-2xl text-gray-900">
            <CountUp
              useEasing={true}
              end={numberOfPanels}
              duration={5}
              suffix=" panels"
            />
          </p>
          <p className="text-2xl text-gray-900">
            Approximate # of Panels needed to offset Avg. Yearly Power Bill of{" "}
            <strong>${averagePowerBill * 12}</strong>{" "}
          </p>
        </div>

        <div className=" max-w-30em w-full h-125 shadow-md">
          <Graph
            graphType="Pie"
            total={initialCost}
            moneySaved={loanCost}
            averagePowerBill={averagePowerBill * 12}
            offSetPowerbillPrice={offSetPowerbillPrice}
            yearlyLoanCost={loanTerm}
          />
        </div>

        <div className=" max-w-30em w-full h-125 shadow-md">
          <Graph
            graphType="Line"
            total={initialCost}
            moneySaved={loanCost}
            averagePowerBill={averagePowerBill}
            yearlyLoanCost={loanTerm}
            offSetPowerbillPrice={offSetPowerbillPrice}
          />
        </div>
      </div>
    </>
  );
};

export default LoanData;
