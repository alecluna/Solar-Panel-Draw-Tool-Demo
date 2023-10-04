import SubmitAddressInfo from "../SubmitAddressInfo/SubmitAddressInfo";
import HowToUse from "./HowToUse";
import { SubmitAddressInfoProps } from "./types";

const Home: React.FC<SubmitAddressInfoProps> = ({
  updateAveragePowerBill,
  updateLocation,
  isLoading,
}) => (
  <div className="sm:pt-24 flex justify-center mx-auto content-centercenter align-middle mx-auto bg-white lg:max-w-2xl p-4">
    <div id="how-to-use" className="flex flex-col">
      <HowToUse />
      <SubmitAddressInfo
        updateAveragePowerBill={updateAveragePowerBill}
        updateLocation={updateLocation}
        isLoading={isLoading}
      />
      <p className="antialiased	text-sm text-slate-600 pt-8">
        Note: Since this is a demo, no info is being stored, showing this off
        because I think it is cool.
      </p>

      <p className="antialiased	text-sm text-slate-600 pt-8">
        Data based on fixed interest rate of 4.15% and a loan term of 20 years.
        Initial cost of system also factors in 30% Federal Tax Credit. (Most of
        this data is from 2019 when product was built)
      </p>
    </div>
  </div>
);

export default Home;
