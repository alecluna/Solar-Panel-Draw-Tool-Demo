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
    padding: "7px",
    border: "none",
    borderBottom: "1px solid #ddd",
    background: "transparent",
    marginBottom: "10px",
    font: "16px Arial, Helvetica, sans-serif",
    height: "45px",
    maxWidth: "100%",
  },
  buttonStyles: {
    display: "inline-block",
    padding: "0.3em 1.2em",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "24px",
    maxWidth: "100%",
  },
  formatErrors: {
    paddingTop: "10px",
    paddingBottom: "10px",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    textAlign: "left",
  },
};

export default form;
