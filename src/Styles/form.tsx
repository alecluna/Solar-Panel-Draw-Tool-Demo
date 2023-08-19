// formStyles.tsx

interface FormStyles {
  textArea: React.CSSProperties;
  buttonStyles: React.CSSProperties;
  formatList: React.CSSProperties;
  formatErrors: React.CSSProperties;
}

const form: FormStyles = {
  textArea: {
    boxSizing: "border-box",
    outline: "none",
    display: "block",
    width: "100%",
    padding: "7px",
    border: "none",
    borderBottom: "1px solid #ddd",
    background: "transparent",
    marginBottom: "10px",
    font: "16px Arial, Helvetica, sans-serif",
    height: "45px",
  },
  buttonStyles: {
    display: "inline-block",
    padding: "0.3em 1.2em",
    width: "15em",
    margin: "1em",
    borderRadius: "1em",
    boxSizing: "border-box",
    fontFamily: "Roboto",
    fontWeight: "500",
    color: "#FFFFFF",
    backgroundColor: "#3a79df",
    textAlign: "center",
    outline: "none",
  },
  formatList: {
    paddingTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: 800,
  },
  formatErrors: {
    padding: "0px 20px 5px 20px",
  },
};

export default form;
