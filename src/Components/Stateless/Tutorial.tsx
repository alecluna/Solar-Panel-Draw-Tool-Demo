import tutorial from "../../assets/tutorial.gif";

const Tutorial = () => (
  <>
    <img
      src={tutorial}
      alt="tutorial"
      style={{
        maxWidth: "450px",
        borderRadius: 10,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    />
  </>
);

export default Tutorial;
