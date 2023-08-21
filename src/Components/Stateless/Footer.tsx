import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "white",
    color: "black",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  footnote: {
    marginTop: theme.spacing(1),
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2">
        Disclosure: This is just a demo version of the product I built for a
        client (with their permission). I'm not storing any info nor keeping any
        data, just wanted to show off this cool tool :D
      </Typography>
      <Typography variant="body2" className={classes.footnote}>
        © {new Date().getFullYear()} Made by Alec Luna
      </Typography>
    </footer>
  );
};

export default Footer;
