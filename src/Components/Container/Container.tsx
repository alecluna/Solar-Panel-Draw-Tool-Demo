import { useState } from "react";
import { AWS_LAMBDA_URL, GOOGLE_MAPS_LOCATION_URL } from "../Utils/constants";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Map from "../Map/Map";
import HomePage from "../HomePage/Home";
import ErrorDialog from "../Dialogs/ErrorDialog";
import { URLString, UpdateAveragePowerBill, ContainerProps } from "./types";
import LoanContainer from "../Graphs/Loan/LoanContainer";

const Container: React.FC<ContainerProps> = ({ showMapBox, setShowMapBox }) => {
  const [openLoanInfo, setOpenLoanInfo] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [squareFootage, setSquareFootage] = useState<number | null>(null);
  const [loanCost, setLoanCost] = useState(0);
  const [numberOfPanels, setNumberOfPanels] = useState<number>(0);
  const [sysSizeKiloWatts, setSysSizeKiloWatts] = useState<number>(0);
  const [initialCost, setInitialCost] = useState(0);
  const [averagePowerBill, setAveragePowerBill] = useState<number>(0);
  const [offSetPowerbillPrice, setOffSetPowerbillPrice] = useState(0);
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const toggleOpenLoanInfo = (): void => {
    setOpenLoanInfo(!openLoanInfo);
  };

  const updateLatLng = (latitude: number, longitude: number): void => {
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

  /* fake loading time */
  const updateLocation = (location: string): void => {
    setLoading(true);

    setTimeout(() => getLocationFromGoogleAPI(location), 1500);
  };

  const updateAveragePowerBill: UpdateAveragePowerBill = (
    averageYearlyPowerBill: number
  ): void => {
    setAveragePowerBill(averageYearlyPowerBill);
  };

  const onUpdateSquareFootage = (newSquareFootage: number): void => {
    setSquareFootage(newSquareFootage);

    if (newSquareFootage > 0) {
      calculateSystemSize(newSquareFootage.toString());
    }
  };

  const calculateSystemSize = async (squareFootage: string): Promise<void> => {
    const url: URLString = AWS_LAMBDA_URL;
    const queryStringURL: URLString = `${url}?squareFootage=${squareFootage}&averagePowerBill=${averagePowerBill}`;

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

        initialCost,
        offSetPowerbillPrice,
      } = data;

      setLoanCost(finalCostforLoan);
      setNumberOfPanels(numberOfPanels);
      setSysSizeKiloWatts(sysSizeKiloWatts);

      setInitialCost(initialCost);
      setOffSetPowerbillPrice(offSetPowerbillPrice);
    } catch (error) {
      setErrorDialogOpen(!errorDialogOpen);
    }

    setLoading(false);
    toggleOpenLoanInfo();
  };

  const getLocationFromGoogleAPI = async (location: string): Promise<void> => {
    const url: URLString = GOOGLE_MAPS_LOCATION_URL;
    const googleMapsAPIURL: URLString = `${url}?address=${encodeURIComponent(
      location
    )}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

    const checklocation = [];
    if (checklocation?.length) {
      setErrorDialogOpen(!errorDialogOpen);
      return;
    }

    try {
      const response = await fetch(googleMapsAPIURL);
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

    setLoading(false);
  };

  if (errorDialogOpen) {
    return (
      <ErrorDialog
        handleClose={() => setErrorDialogOpen(!errorDialogOpen)}
        title="Error with request"
        message="Whoops, something went wrong with your request, please try again"
      />
    );
  }

  return (
    <div className="h-full w-full">
      <main className="md:w-auto">
        {showMapBox ? (
          <Map
            center={{ lat, lng }}
            onUpdateSquareFootage={onUpdateSquareFootage}
            errorDialogOpen={errorDialogOpen}
            setErrorDialogOpen={setErrorDialogOpen}
          />
        ) : (
          <HomePage
            updateAveragePowerBill={updateAveragePowerBill}
            updateLocation={updateLocation}
            isLoading={isLoading}
          />
        )}
      </main>

      {isLoading && showMapBox && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <LoadingSpinner />
        </div>
      )}
      <LoanContainer
        isOpen={openLoanInfo}
        handleClose={toggleOpenLoanInfo}
        squareFootage={squareFootage}
        loanCost={loanCost}
        numberOfPanels={numberOfPanels}
        sysSizeKiloWatts={sysSizeKiloWatts}
        initialCost={initialCost}
        averagePowerBill={averagePowerBill}
        offSetPowerbillPrice={offSetPowerbillPrice}
      />
    </div>
  );
};

export default Container;
