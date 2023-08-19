import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

type appBar = CSSProperties | undefined;
interface DrawToolAppBarProps {
  classes: CSSProperties;
}
const DrawToolAppBar: React.FC<DrawToolAppBarProps> = ({ classes }) => {
  return (
    <>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        color="default"
        className={classes.appBar}
      >
        <Toolbar className="toolbar" variant="dense">
          <Typography
            className="my-first-step"
            style={{ flex: 1 }}
            variant="h6"
            noWrap
          >
            My Solar Cost
          </Typography>{" "}
          <Typography>Demo version</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default DrawToolAppBar;
