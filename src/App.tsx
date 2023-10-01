import { useState } from "react";
import Container from "./Components/Container";
import DrawToolAppBar from "./Components/Appbar/Appbar";

const App: React.FC = () => {
  const [showMapBox, setShowMapBox] = useState<boolean>(false);

  return (
    <>
      <DrawToolAppBar setShowMapBox={setShowMapBox} />
      <Container setShowMapBox={setShowMapBox} showMapBox={showMapBox} />
    </>
  );
};

export default App;
