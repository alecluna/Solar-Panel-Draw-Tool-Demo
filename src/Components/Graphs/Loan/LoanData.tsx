import { LoanDataProps } from "../types";
import CountUp from "react-countup";
import Graph from "../Graph";
import LoanCard from "./LoanCard";
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
      <div className="m-3">
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
      <div className="flex flex-wrap p-2">
        <LoanCard>
          <div className="flex flex-col">
            <p className="text-2xl antialiased text-slate-700 w-1/2 p-2">
              <CountUp
                prefix="$"
                end={calculateSavingsOverLife()}
                duration={4}
              />
            </p>
            <p className="text-md antialiased text-slate-700 p-2">
              Estimated savings over 25 years, when comparing your avg. monthly
              power bill of <strong>${averagePowerBill}</strong> to{" "}
              <strong>${loanTerm}</strong>:{" "}
            </p>
          </div>
        </LoanCard>
        <LoanCard>
          <p className="text-2xl antialiased text-slate-700 w-1/2 p-2">
            <CountUp
              useEasing={true}
              end={sysSizeKiloWatts}
              duration={4}
              suffix=" kW"
            />
          </p>
          <p className=" p-2">
            Total System Size in kW for{" "}
            <strong>{narrowSquareFootagType()}</strong> sqft roof:
          </p>
        </LoanCard>

        <LoanCard>
          <div className="flex">
            <div className="flex-none w-1/3 min-w-0 p-2">
              <p>
                <CountUp
                  useEasing={true}
                  end={loanTerm}
                  duration={4}
                  prefix="$"
                />
              </p>
              <p className="text-md antialiased text-slate-700">
                Est. New Monthly Loan Payment{" "}
              </p>
            </div>
            <div className="flex-none flex justify-center items-center w-1/3 min-w-0 p-2">
              <img className="w-10 h-10" src={arrow} alt="arrow" />
            </div>
            <div className="flex-none w-1/3 min-w-0 p-2">
              <p>
                <CountUp
                  useEasing={true}
                  end={averagePowerBill - loanTerm}
                  duration={4}
                  prefix="$"
                />
              </p>
              <p className="text-md antialiased text-slate-700">
                Monthly Savings{" "}
              </p>
            </div>
          </div>
        </LoanCard>

        <LoanCard>
          <p className="w-1/2 text-2xl text-gray-900 p-2">
            <CountUp
              useEasing={true}
              end={numberOfPanels}
              duration={5}
              suffix=" panels"
            />
          </p>
          <p className="text-md antialiased text-slate-700 p-2">
            Approximate # of Panels needed to offset Avg. Yearly Power Bill of{" "}
            <strong>${averagePowerBill * 12}</strong>{" "}
          </p>
        </LoanCard>

        <LoanCard>
          <Graph
            graphType="Pie"
            total={initialCost}
            moneySaved={loanCost}
            averagePowerBill={averagePowerBill * 12}
            offSetPowerbillPrice={offSetPowerbillPrice}
            yearlyLoanCost={loanTerm}
          />
        </LoanCard>

        <LoanCard>
          <Graph
            graphType="Line"
            total={initialCost}
            moneySaved={loanCost}
            averagePowerBill={averagePowerBill}
            yearlyLoanCost={loanTerm}
            offSetPowerbillPrice={offSetPowerbillPrice}
          />
        </LoanCard>
        <p className="antialiased	text-xs text-slate-500 p-1">
          Data based on fixed interest rate of 4.15% and a loan term of 20
          years. Initial cost of system also factors in 30% Federal Tax Credit.
          (Most of this data is from 2019 when product was built)
        </p>
      </div>
    </>
  );
};

export default LoanData;
