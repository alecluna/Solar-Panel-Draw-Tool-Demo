import { styled } from "styled-components";

const BackgroundImage = styled.div`
  width: 100%;
  height: 800px; /* Adjust height as needed */
  background: linear-gradient(135deg, #ffff 0%, #20c6fa 100%);
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: no-wrap;
  flex-direction: row;
  align-items: center;
  overflow: hidden;

  @media (max-width: 200px) {
    padding-top: 4em;
    overflow: hidden;
  }
`;

const StyledOverlay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
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
    width: 25em;
    height: 15em;
  }

  @media (max-width: 75px) {
  }
`;

export {
  BackgroundImage,
  StyledOverlay,
  StyledContainer,
  HeaderText,
  SolarImage,
};
