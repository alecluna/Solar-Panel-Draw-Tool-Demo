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
}) => {
  return (
    <>
      {/* <StyledContainer>
        <BackgroundImage>
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
      </StyledContainer> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          flexDirection: "row",
          // height: "100vh",
          // overflow: "hidden",
          maxWidth: "fit-content",
          margin: "48px auto",
        }}
      >
        {/* <Divider style={{ margin: "24px 24px", width: "70%" }} /> */}

        <HowToUse />
        {/* <Divider style={{ margin: "24px 24px", width: "70%" }} /> */}

        <SubmitAddressInfo
          updateAveragePowerBill={updateAveragePowerBill}
          updateLocation={updateLocation}
        />
      </div>
    </>
  );
};

export default HomePage;
