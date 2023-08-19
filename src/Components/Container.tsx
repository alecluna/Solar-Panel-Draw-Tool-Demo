import { SetStateAction, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PopUpValidator from "./Stateless/PopUp";
import LoanInfo from "./Stateless/LoanInfo";

import Map from "./MapComponents/Map";
import HomePage from "./Stateless/Home/HomePage";
import axios from "axios";
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

type UpdateAveragePowerBill = (
  averagePowerBill: SetStateAction<number | string>
) => void;

const Container = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openLoanInfo, setOpenLoanInfo] = useState(false);
  const [isEmailProvided, setIsEmailProvided] = useState(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [squareFootage, setSquareFootage] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [loanCost, setLoanCost] = useState(0);
  const [numberOfPanels, setNumberOfPanels] = useState(0);
  const [sysSizeKiloWatts, setSysSizeKiloWatts] = useState(0);
  const [systemSizeinWatts, setSystemSizeinWatts] = useState(0);
  const [initialCost, setInitialCost] = useState(0);
  const [averagePowerBill, setAveragePowerBill] = useState("");
  const [offSetPowerbillPrice, setOffSetPowerbillPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [showMapBox, setShowMapBox] = useState(false);

  const toggleCollectLeadInfo = () => {
    setOpen(!open);
  };

  const toggleOpenLoanInfo = () => {
    setOpenLoanInfo(true);
  };

  const handleCloseLoanInfo = () => {
    setOpenLoanInfo(false);
  };

  const handleClose = () => {
    setOpen(false);
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

  const updateSquareFootage = (newsSquareFootage: number) => {
    setSquareFootage(newsSquareFootage);
    toggleCollectLeadInfo();
  };

  const updateAveragePowerBill: UpdateAveragePowerBill = (
    averageYearlyPowerBill: SetStateAction<string>
  ) => {
    setAveragePowerBill(averageYearlyPowerBill);
  };

  const toggleEmailProvided = (
    phoneNumber: SetStateAction<string>,
    name: SetStateAction<string>,
    buildEmail: SetStateAction<string>
  ) => {
    if (name || phoneNumber) {
      setIsEmailProvided(true);
      setEmail(buildEmail);
      setName(name);
      setPhoneNumber(phoneNumber);
    } else {
      setIsEmailProvided(true);
      setEmail(buildEmail);
    }
    // sendEmail();
  };

  // NOTE: This is the function that sends the email to the user
  // No longer needed for Demo version
  // const sendEmail = () => {
  //   const url =
  //     "https://kdqi0skbo3.execute-api.us-east-1.amazonaws.com/default/handleEmails";
  //   axios
  //     .get(url, {
  //       headers: {
  //         "x-api-key": import.meta.env.VITE_AWS_LAMBDA_KEY,
  //       },
  //       params: {
  //         email,
  //         name,
  //         phoneNumber,
  //         bill: averagePowerBill,
  //         address,
  //       },
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const calculateSystemSize = async () => {
    setLoading(true);
    const url =
      "https://kdqi0skbo3.execute-api.us-east-1.amazonaws.com/default/calculateSystemSize";
    axios
      .get(url, {
        headers: {
          "x-api-key": import.meta.env.VITE_AWS_LAMBDA_KEY,
        },
        params: {
          squareFootage,
          averagePowerBill,
        },
      })
      .then((response) => {
        setLoanCost(response.data.finalCostforLoan);
        setNumberOfPanels(response.data.numberOfPanels);
        setSysSizeKiloWatts(response.data.sysSizeKiloWatts);
        setSystemSizeinWatts(response.data.systemSizeinWatts);
        setInitialCost(response.data.initialCost);
        setOffSetPowerbillPrice(response.data.offSetPowerbillPrice);
      })
      .catch((error) => console.log(error));

    setLoading(false);
  };

  const getLocationFromGoogleAPI = async (location: string) => {
    console.log(
      "location: ",
      location,
      "import.meta.env.VITE_GOOGLE_API_KEY: ",
      import.meta.env.VITE_GOOGLE_API_KEY
    );

    setAddress(location);
    const url = "https://maps.googleapis.com/maps/api/geocode/json";

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
      console.log("response: ", data, "getLat: ", getLat, "getLng: ", getLng);
      updateLatLng(getLat, getLng);
    } catch (error) {
      console.log("error: ", error);
      setErrorDialogOpen(true);
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

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <DrawToolAppBar classes={classes} />
      <main>
        {showMapBox ? (
          <div style={{ marginTop: "48px" }}>
            <Map
              center={{ lat, lng }}
              updateSquareFootage={updateSquareFootage}
              errorDialogOpen={errorDialogOpen}
              setRrrorDialogOpen={setErrorDialogOpen}
            />
          </div>
        ) : (
          <HomePage
            updateAveragePowerBill={updateAveragePowerBill}
            updateLocation={updateLocation}
          />
        )}
        <PopUpValidator
          open={open}
          squareFootage={squareFootage}
          handleClose={handleClose}
          toggleEmailProvided={toggleEmailProvided}
          toggleOpenLoanInfo={toggleOpenLoanInfo}
          calculateSystemSize={calculateSystemSize}
        />
        <LoanInfo
          open={openLoanInfo}
          handleClose={handleCloseLoanInfo}
          squareFootage={squareFootage}
          email={email}
          loanCost={loanCost}
          numberOfPanels={numberOfPanels}
          sysSizeKiloWatts={sysSizeKiloWatts}
          initialCost={initialCost}
          averagePowerBill={averagePowerBill}
          offSetPowerbillPrice={offSetPowerbillPrice}
        />
      </main>
    </div>
  );
};

export default Container;
