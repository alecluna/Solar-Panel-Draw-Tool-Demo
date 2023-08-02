import React from "react";
import {
  AppBar,
  CssBaseline,
  Divider,
  SwipeableDrawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import ToolDirections from "./Stateless/ToolDirections";
import FormikAverageBill from "./AveragePowerBill";
import PopUpValidator from "./Stateless/PopUp";
import LoanInfo from "../Components/Stateless/LoanInfo";
import PrivacyPolicy from "../Components/Stateless/PrivacyPolicy";
import Map from "./MapComponents/Map";
import EmptyState from "./Utils/EmptyState";
import Tutorial from "./Utils/Tutorial";
import axios from "axios";
import "../Styles/animation.css";
import ReactGA from "react-ga";
import Joyride, { STATUS } from "react-joyride";
require("dotenv").config();

const styles = theme => ({
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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
});

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      run: true,
      mobileOpen: false,
      open: false,
      privacyPolicy: false,
      drawTool: false,
      openLoanInfo: false,
      isEmailProvided: false,
      lat: null,
      lng: null,
      location: "",
      squareFootage: null,
      email: "",
      loanCost: 0,
      numberOfPanels: 0,
      sysSizeKiloWatts: 0,
      systemSizeinWatts: 0,
      initialCost: 0,
      averagePowerBill: 0,
      offSetPowerbillPrice: 0,
      phoneNumber: "",
      name: "",
      animateHamburger: true,
      address: "",
      error: false,
      steps: [
        {
          content: (
            <div style={{ zIndex: 200000 }}>
              <Typography
                style={{ fontWeight: "500", fontSize: "1.5em" }}
                variant="h5"
                gutterBottom
              >
                Welcome to My Solar Cost!
              </Typography>
              <Typography
                color="textSecondary"
                style={{
                  fontWeight: "400",
                  fontSize: "1.1em",
                  marginBottom: 5,
                }}
                gutterBottom
              >
                Here's a quick tutorial to show you how to use our tool!
              </Typography>
              <>
                <Tutorial />
              </>
            </div>
          ),
          placement: "center",
          placementBeacon: "left",
          isFixed: true,
          target: "body",
        },
        {
          content: (
            <div style={{ zIndex: 200000 }}>
              <Typography
                style={{ fontWeight: "400", fontSize: "1em", marginBottom: 5 }}
                gutterBottom
              >
                <strong>Click</strong> on the menu bar and enter the necessary
                information about your home and power usage!
              </Typography>
            </div>
          ),
          placement: "top",
          locale: { skip: "SKIP" },
          target: ".menu-icon2",
        },
        {
          content: (
            <>
              <Typography
                align="center"
                variant="h5"
                style={{ fontWeight: "500" }}
                gutterBottom
              >
                How to use the draw tool:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                style={{ fontWeight: "400", fontSize: "1em" }}
                gutterBottom
              >
                Click/Tap on a portion of your roof! For best results, select
                the largest surface of your roof that is facing south.
              </Typography>
              <>
                <Tutorial />
              </>
            </>
          ),
          placement: "center",
          locale: { skip: "SKIP" },
          isFixed: true,
          target: "body",
        },
      ],
    };
  }

  componentDidMount = () => {
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  handleJoyrideCallback = data => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ run: false });
    }
  };

  toggleDrawTool = () => {
    this.setState({ run: true });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
    this.setState({ animateHamburger: false });
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  togglePrivacyPolicy = () => {
    this.setState({ privacyPolicy: !this.state.privacyPolicy });
  };

  toggleOpenLoanInfo = () => {
    this.setState({ openLoanInfo: true });
  };

  handleCloseLoanInfo = () => {
    this.setState({ openLoanInfo: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateLatLng = (lat, lng) => {
    this.setState({ lat: lat, lng: lng });
  };

  updateLocation = location => {
    this.setState({ location: location }, () => {
      this.sendLocation(this.state.location);
    });
  };

  updateSquareFootage = newsSquareFootage => {
    this.setState({ squareFootage: newsSquareFootage }, () => {
      this.toggleOpen();
    });
  };

  updateAveragePowerBill = averageYearlyPowerBill => {
    this.setState({ averagePowerBill: averageYearlyPowerBill });
  };

  toggleEmailProvided = (phoneNumber, name, buildEmail) => {
    name || phoneNumber
      ? this.setState({
          isEmailProvided: true,
          email: buildEmail,
          name: name,
          phoneNumber: phoneNumber,
        })
      : this.setState({ isEmailProvided: true, email: buildEmail });

    this.sendEmail();
  };

  sendEmail = () => {
    const { email, name, phoneNumber, averagePowerBill, address } = this.state;
    let url =
      "https://kdqi0skbo3.execute-api.us-east-1.amazonaws.com/default/handleEmails";
    axios
      .get(url, {
        headers: {
          "x-api-key": process.env.REACT_APP_AWS_LAMBDA_KEY,
        },
        params: {
          email: email,
          name: name,
          phoneNumber: phoneNumber,
          bill: averagePowerBill,
          address: address,
        },
      })
      .catch(error => {
        console.log(error);
      });
  };

  calculateSystemSize = () => {
    const { squareFootage, averagePowerBill } = this.state;

    this.handleClose();
    let url =
      "https://kdqi0skbo3.execute-api.us-east-1.amazonaws.com/default/calculateSystemSize";
    axios
      .get(url, {
        headers: {
          "x-api-key": process.env.REACT_APP_AWS_LAMBDA_KEY,
        },
        params: {
          squareFootage: squareFootage,
          averagePowerBill: averagePowerBill,
        },
      })
      .then(response => {
        this.setState({
          loanCost: response.data.finalCostforLoan,
          numberOfPanels: response.data.numberOfPanels,
          sysSizeKiloWatts: response.data.sysSizeKiloWatts,
          systemSizeinWatts: response.data.systemSizeinWatts,
          initialCost: response.data.initialCost,
          offSetPowerbillPrice: response.data.offSetPowerbillPrice,
        });
      })
      .catch(error => console.log(error));
  };

  sendLocation = location => {
    console.log("location: ", location);
    this.setState({ address: location });
    let url = "https://maps.googleapis.com/maps/api/geocode/json";
    axios
      .get(url, {
        params: {
          address: location,
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      })
      .then(response => {
        console.log("response: ", response);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        this.setState({ lat: lat, lng: lng });
      })
      .catch(error => {
        console.log("error: ", error);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      mobileOpen,
      lat,
      lng,
      open,
      squareFootage,
      email,
      openLoanInfo,
      loanCost,
      numberOfPanels,
      sysSizeKiloWatts,
      initialCost,
      averagePowerBill,
      privacyPolicy,
      offSetPowerbillPrice,
      animateHamburger,
      run,
      steps,
    } = this.state;
    const center = { lat, lng };
    let key = process.env.REACT_APP_GOOGLE_API_KEY;
    let animateHamMenuClass = animateHamburger ? "menu-icon" : null;

    const drawer = (
      <div style={{ width: 275 }}>
        <Divider />
        <ToolDirections />
        <Divider />
        <FormikAverageBill
          updateAveragePowerBill={this.updateAveragePowerBill}
          updateLocation={this.updateLocation}
          handleDrawerToggle={this.handleDrawerToggle}
          mobileOpen={mobileOpen}
          togglePrivacyPolicy={this.togglePrivacyPolicy}
        />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Joyride
          callback={this.handleJoyrideCallback}
          run={run}
          disableOverlayClose
          continuous
          steps={steps}
          locale={{ last: "Next" }}
          styles={{
            buttonClose: {
              display: "none",
            },
            options: {
              zIndex: 200000,
              width: "100%",
            },
            buttonNext: {
              backgroundColor: "#3a79df",
              borderRadius: 4,
              color: "#fff",
            },
            buttonBack: {
              color: "#3a79df",
              marginLeft: "auto",
              marginRight: 5,
            },
            beacon: {
              display: "none",
            },
            tooltip: {
              width: window.innerWidth <= 600 ? 300 : window.innerWidth / 2,
              margin: 0,
            },
          }}
        />
        <AppBar
          elevation={0}
          position="fixed"
          color="default"
          className={classes.appBar}
        >
          <Toolbar className="toolbar" variant="dense">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={animateHamMenuClass}
              style={{ marginRight: 20 }}
            >
              <MenuIcon
                onClose={this.handleDrawerToggle}
                style={{ fontSize: "34px", borderRadius: "20px" }}
                className="menu-icon2"
              />
            </IconButton>
            <SwipeableDrawer
              open={this.state.mobileOpen}
              onOpen={this.handleDrawerToggle}
              onClose={this.handleDrawerToggle}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerToggle}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              {drawer}
            </SwipeableDrawer>
            <Typography
              className="my-first-step"
              style={{ flex: 1 }}
              variant="h6"
              noWrap
            >
              My Solar Cost
            </Typography>{" "}
            <Button
              align="center"
              style={{ backgroundColor: "#3c78dd", color: "#FFFF" }}
              variant="contained"
              onClick={() => this.setState({ run: true })}
            >
              Tutorial
            </Button>
          </Toolbar>
        </AppBar>
        <main className={`${classes.content} container`}>
          {lat && lng ? (
            <Map
              className="map"
              isMarkerShown={false}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${key}&libraries=drawing,geometry`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              MapTypeId="satellite"
              center={center}
              updateSquareFootage={this.updateSquareFootage}
            />
          ) : (
            <div>
              <EmptyState
                mobileOpen={mobileOpen}
                handleDrawerToggle={this.handleDrawerToggle}
              />
            </div>
          )}
          <PopUpValidator
            open={open}
            squareFootage={squareFootage}
            handleClose={this.handleClose}
            toggleEmailProvided={this.toggleEmailProvided}
            toggleOpenLoanInfo={this.toggleOpenLoanInfo}
            calculateSystemSize={this.calculateSystemSize}
            togglePrivacyPolicy={this.togglePrivacyPolicy}
          />
          <LoanInfo
            open={openLoanInfo}
            handleClose={this.handleCloseLoanInfo}
            squareFootage={squareFootage}
            email={email}
            loanCost={loanCost}
            numberOfPanels={numberOfPanels}
            sysSizeKiloWatts={sysSizeKiloWatts}
            initialCost={initialCost}
            averagePowerBill={averagePowerBill}
            offSetPowerbillPrice={offSetPowerbillPrice}
            togglePrivacyPolicy={this.togglePrivacyPolicy}
          />
          <PrivacyPolicy
            togglePrivacyPolicy={this.togglePrivacyPolicy}
            privacyPolicy={privacyPolicy}
          />
        </main>
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Container);
