import { SetStateAction, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AWS_LAMBDA_URL, GOOGLE_MAPS_LOCATION_URL } from "./Utils/constants";
import LoanInfo from "./Stateless/LoanInfo";

import Map from "./MapComponents/Map";
import HomePage from "./Stateless/Home/HomePage";
import "../Styles/animation.css";
import DrawToolAppBar from "./Stateless/Appbar";

import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorDialog from "./Stateless/ErrorDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: "1px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    height: "100%",
  },
  menuIcon: {
    fontSize: "34px",
    borderRadius: "20px",
  },
  tutorialButton: {
    backgroundColor: "#3c78dd",
    color: "#FFFF",
  },
}));

interface ContainerState {
  prop1: string;
  prop2: number;
  // Add more state properties here
}

type UpdateAveragePowerBill = (averagePowerBill: number) => void;

const Container = () => {
  const classes = useStyles();

  // const [openLeadInfoDialog, setOpenLeadInfoDialog] = useState<boolean>(false);
  // const [isEmailProvided, setIsEmailProvided] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState<string>("");
  const [openLoanInfo, setOpenLoanInfo] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [squareFootage, setSquareFootage] = useState<number | null>(null);
  const [loanCost, setLoanCost] = useState(0);
  const [numberOfPanels, setNumberOfPanels] = useState(0);
  const [sysSizeKiloWatts, setSysSizeKiloWatts] = useState(0);
  const [systemSizeinWatts, setSystemSizeinWatts] = useState(0);
  const [initialCost, setInitialCost] = useState(0);
  const [averagePowerBill, setAveragePowerBill] = useState<number>(0);
  const [offSetPowerbillPrice, setOffSetPowerbillPrice] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [showMapBox, setShowMapBox] = useState(false);

  const toggleOpenLoanInfo = () => {
    setOpenLoanInfo(!openLoanInfo);
  };

  const updateLatLng = (latitude: number, longitude: number) => {
    const isValidLongitude = longitude >= -180 && longitude <= 180;
    const isValidLatitude = latitude >= -90 && latitude <= 90;

    if (isValidLongitude && isValidLatitude) {
      setShowMapBox(true);
      setLat(latitude);
      setLng(longitude);
    } else {
      setErrorDialogOpen(true);
    }
  };

  const updateLocation = (location: string) => {
    setLocation(location);
    getLocationFromGoogleAPI(location);
  };

  const updateAveragePowerBill: UpdateAveragePowerBill = (
    averageYearlyPowerBill: number
  ) => {
    setAveragePowerBill(averageYearlyPowerBill);
  };

  const onUpdateSquareFootage = (newSquareFootage: number) => {
    setSquareFootage(newSquareFootage);

    if (newSquareFootage > 0) {
      calculateSystemSize(newSquareFootage.toString());
    }
  };

  const calculateSystemSize = async (squareFootage: string) => {
    const url = AWS_LAMBDA_URL;
    const queryStringURL = `${url}?squareFootage=${squareFootage}&averagePowerBill=${averagePowerBill}`;
    setLoading(true);

    try {
      const response = await fetch(queryStringURL, {
        method: "GET",
        mode: "cors", // Request mode set to 'cors'
      });
      const data = await response.json();

      const {
        finalCostforLoan,
        numberOfPanels,
        sysSizeKiloWatts,
        systemSizeinWatts,
        initialCost,
        offSetPowerbillPrice,
      } = data;

      setLoanCost(finalCostforLoan);
      setNumberOfPanels(numberOfPanels);
      setSysSizeKiloWatts(sysSizeKiloWatts);
      setSystemSizeinWatts(systemSizeinWatts);
      setInitialCost(initialCost);
      setOffSetPowerbillPrice(offSetPowerbillPrice);
    } catch (error) {
      setErrorDialogOpen(!errorDialogOpen);
    }

    setLoading(false);
    // toggleOpenLoanInfo();
  };

  const getLocationFromGoogleAPI = async (location: string) => {
    setAddress(location);
    const url = GOOGLE_MAPS_LOCATION_URL;
    try {
      const response = await fetch(
        `${url}?address=${encodeURIComponent(location)}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const getLat = data.results[0].geometry.location.lat;
      const getLng = data.results[0].geometry.location.lng;

      updateLatLng(getLat, getLng);
    } catch (error) {
      console.log("error: ", error);
      setErrorDialogOpen(!errorDialogOpen);
    }
  };

  if (errorDialogOpen) {
    return (
      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(!errorDialogOpen)}
        title="Error with request"
        message="Whoops, something went wrong with your request, please try again"
      />
    );
  }

  return (
    <div className={classes.root}>
      <DrawToolAppBar classes={classes} />
      <main>
        {showMapBox ? (
          <div style={{ marginTop: "48px" }}>
            <Map
              center={{ lat, lng }}
              onUpdateSquareFootage={onUpdateSquareFootage}
              errorDialogOpen={errorDialogOpen}
              setErrorDialogOpen={setErrorDialogOpen}
            />
          </div>
        ) : (
          <HomePage
            updateAveragePowerBill={updateAveragePowerBill}
            updateLocation={updateLocation}
          />
        )}
        {/* <PopUpValidatorDialog
          open={openLeadInfoDialog}
          squareFootage={squareFootage}
          handleClose={toggleLeadCollection}
          toggleEmailProvided={toggleEmailProvided}
          toggleOpenLoanInfo={toggleOpenLoanInfo}
          calculateSystemSize={calculateSystemSize}
          formikPayload={{
            name,
            address,
            phoneNumber,
            email,
          }}
        /> */}
        <LoanInfo
          open={openLoanInfo}
          handleClose={toggleOpenLoanInfo}
          squareFootage={squareFootage}
          loanCost={loanCost}
          numberOfPanels={numberOfPanels}
          sysSizeKiloWatts={sysSizeKiloWatts}
          initialCost={initialCost}
          averagePowerBill={averagePowerBill}
          offSetPowerbillPrice={offSetPowerbillPrice}
        />
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            <CircularProgress thickness={4} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Container;
