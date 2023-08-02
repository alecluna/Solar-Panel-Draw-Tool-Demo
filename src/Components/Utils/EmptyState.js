import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import "../../Styles/animation.css";
import header from "../../assets/HeaderStyle.svg";
import header500 from "../../assets/HeaderStyle500.svg";

import solarCanva from "../../assets/Canva_Solar-min.jpg";
import styled from "styled-components";

const BackgroundImage = styled.img`
  position: absolute;
  -webkit-background-size: auto;
  -moz-background-size: auto;
  -o-background-size: auto;
  background-size: auto;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  padding-top: 5em;
  overflow: hidden;

  @media (max-width: 500px) {
    padding-top: 4em;
    overflow: hidden;
  }
`;

const HeaderText = styled.div`
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  align-items: center;

  @media (max-width: 600px) {
    margin-top: 2em;
  }
`;

const SolarImage = styled.img`
  width: 55em;
  height: 35em;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(186, 186, 186, 0.3),
    0 6px 6px rgba(193, 193, 193, 0.22);

  @media (max-width: 900px) {
    width: 40em;
    height: 25em;
  }

  @media (max-width: 600px) {
    width: 30em;
    height: 23em;
  }

  @media (max-width: 375px) {
    width: 25em;
    height: 15em;
  }
`;

// Custom window sizing hook
function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const EmptyState = ({ mobileOpen, handleDrawerToggle }) => {
  //custom window size hook
  const size = useWindowSize();

  return (
    <div>
      <BackgroundImage
        src={size.width <= 650 ? header500 : header}
        alt="header"
      />

      <Container>
        <HeaderText>
          <Typography
            align="center"
            style={{ fontSize: "3.5em", color: "white", fontWeight: 300 }}
          >
            Welcome to
          </Typography>
          <Typography
            align="center"
            style={{
              fontSize: "3.5em",
              color: "white",
              paddingBottom: 10,
              fontWeight: 300
            }}
          >
            {" "}
            My Solar Cost
          </Typography>
          <Button
            align="center"
            style={{
              color: "#FFFF",
              backgroundColor: "#3a79df",
              width: "75%"
            }}
            variant="contained"
            onClick={!mobileOpen ? handleDrawerToggle : null}
          >
            Click Here to Get Started
          </Button>
        </HeaderText>
        <div style={{ marginTop: "4em" }}>
          <SolarImage src={solarCanva} alt="solar neighborhood" />
        </div>
      </Container>
    </div>
  );
};

export default EmptyState;
