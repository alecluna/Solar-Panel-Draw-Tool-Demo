import "../../../Styles/animation.css";
import SubmitAddressInfo from "../../SubmitAddressInfo/SubmitAddressInfo";
import HowToUse from "./HowToUse";

type UpdateAveragePowerBill = (averagePowerBill: number) => void;
type UpdateLocation = (location: Partial<string>) => void;

interface SubmitAddressInfoProps {
  updateAveragePowerBill: UpdateAveragePowerBill;
  updateLocation: UpdateLocation;
}

const HomePage: React.FC<SubmitAddressInfoProps> = ({
  updateAveragePowerBill,
  updateLocation,
}) => (
  <div className="sm:pt-24 flex justify-center mx-auto content-centercenter align-middle mx-auto bg-white lg:max-w-2xl p-4">
    <div id="how-to-use" className="flex flex-col">
      <HowToUse />
      <SubmitAddressInfo
        updateAveragePowerBill={updateAveragePowerBill}
        updateLocation={updateLocation}
      />
    </div>
  </div>
);

export default HomePage;
