import { makeStyles } from "@material-ui/core";
import Container from "./Components/Container";
import DrawToolAppBar from "./Components/Stateless/Appbar";
// import Footer from "./Components/Stateless/Footer";
import { containerStyles } from "./Styles/containerStyles";

const useStyles = makeStyles(() => ({ ...containerStyles }));
const App = () => {
  const classes = useStyles();
  return (
    <div
    // className="App"
    // style={{
    //   minHeight: "100vh",
    //   display: "flex",
    //   flexDirection: "column",
    // }}
    >
      <DrawToolAppBar classes={classes} />
      <Container />
      {/* <div style={{ marginTop: "auto" }}>
        <Footer />
      </div> */}
    </div>
  );
};

export default App;
