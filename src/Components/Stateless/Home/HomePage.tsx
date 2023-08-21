import { Typography, Button, Divider } from "@material-ui/core";
import "../../../Styles/animation.css";
import useWindowSize from "../../Utils/useWindowSize";

import solarCanva from "../../../../src/assets/Canva_Solar-min.jpg";
import ToolDirections from "./ToolDirections";
import SubmitAddressInfo from "../../SubmitAddressInfo/SubmitAddressInfo";
import HowToUse from "./HowToUse";
import {
  BackgroundImage,
  StyledContainer,
  HeaderText,
  SolarImage,
  StyledOverlay,
} from "./styles";

type UpdateAveragePowerBill = (averagePowerBill: number | string) => void;
type UpdateLocation = (location: Partial<string>) => void;

interface SubmitAddressInfoProps {
  updateAveragePowerBill: UpdateAveragePowerBill;
  updateLocation: UpdateLocation;
}

const HomePage: React.FC<SubmitAddressInfoProps> = ({
  updateAveragePowerBill,
  updateLocation,
}) => {
  //custom window size hook
  const size = useWindowSize();
  const width = size.width;
  return (
    <>
      <StyledContainer>
        <BackgroundImage>
          {/* // src={width !== undefined && width <= 650 ? header500 : header}
          // alt="header" */}
          <StyledOverlay>
            <HeaderText>
              <Typography align="center" variant="h3">
                Welcome to
              </Typography>
              <Typography align="center" variant="h3" style={{}}>
                {" "}
                My Solar Cost
              </Typography>
              <ToolDirections />
              <Button onClick={() => null}>Click Here to Get Started</Button>
            </HeaderText>

            <div style={{ marginTop: "4em" }}>
              <SolarImage src={solarCanva} alt="solar neighborhood" />
            </div>
          </StyledOverlay>
        </BackgroundImage>
      </StyledContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Divider style={{ margin: "24px 24px", width: "70%" }} />
        <HowToUse />
        <Divider style={{ margin: "24px 24px", width: "70%" }} />

        <SubmitAddressInfo
          updateAveragePowerBill={updateAveragePowerBill}
          updateLocation={updateLocation}
        />
      </div>
    </>
  );
};

export default HomePage;
