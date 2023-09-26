import { useState } from "react";
import Container from "./Components/Container";
import DrawToolAppBar from "./Components/Stateless/Appbar";
// import Footer from "./Components/Stateless/Footer";

const App = () => {
  const [showMapBox, setShowMapBox] = useState(false);

  return (
    <>
      <DrawToolAppBar setShowMapBox={setShowMapBox} />
      <Container setShowMapBox={setShowMapBox} showMapBox={showMapBox} />
    </>
  );
};

export default App;
