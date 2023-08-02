import React from "react";
import { Typography } from "@material-ui/core";
import Tutorial from "../Utils/Tutorial";

const Steps = [
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
          style={{ fontWeight: "400", fontSize: "1.1em" }}
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
    target: "body"
  },
  {
    content: (
      <div style={{ zIndex: 200000 }}>
        <Typography style={{ fontWeight: "400", fontSize: "1em" }} gutterBottom>
          <strong>Click</strong> on the menu bar and enter the necessary
          information about your home and power usage!
        </Typography>
      </div>
    ),
    placement: "top",
    locale: { skip: "SKIP" },
    target: ".menu-icon"
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
          Click/Tap on a portion of your roof! For best results, select the
          largest surface of your roof that is facing south.
        </Typography>
        <>
          <Tutorial />
        </>
      </>
    )
  }
];

export default Steps;
