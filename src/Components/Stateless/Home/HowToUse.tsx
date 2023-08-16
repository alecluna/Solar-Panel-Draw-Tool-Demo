import { Typography } from "@material-ui/core";
import Tutorial from "../Tutorial";

const HowToUse = () => {
  return (
    <div
      id="how-to-use"
      style={{
        margin: 24,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        maxWidth: "800px",
      }}
    >
      <Typography
        style={{ fontWeight: "bold", fontSize: "2em", marginBottom: 24 }}
        align="center"
      >
        How to use this tool:
      </Typography>

      <Typography
        style={{ fontWeight: "500", fontSize: "1.5em", marginBottom: 24 }}
        align="center"
      >
        Use your mouse and click on the four corners of your rooftop. This will
        calculate the area you would like to place your solar panels!
      </Typography>

      <div>
        <Tutorial />
      </div>
    </div>
  );
};

export default HowToUse;
