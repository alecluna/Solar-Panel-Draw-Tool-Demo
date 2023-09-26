import {
  Dialog,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CountUp from "react-countup";
import Graph from "../Graphs/Graph";
import CloseIcon from "@material-ui/icons/Close";
import arrow from "../../assets/right-arrow.svg";

const styles = {
  cardStyle: {
    margin: "10px",
    maxWidth: "30em",
    width: "100%",
    height: 125,
    boxShadow:
      "0 10px 20px rgba(186, 186, 186, 0.3), 0 6px 6px rgba(193, 193, 193, 0.22)",
  },
  graphCardStyle: {
    margin: "10px",
    width: "30em",
    boxShadow:
      "0 10px 20px rgba(186, 186, 186, 0.3), 0 6px 6px rgba(193, 193, 193, 0.22)",
  },
  dialogueStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "5px",
  },
};

interface LoanInfoProps {
  open: boolean;
  squareFootage: number | null;
  handleClose: () => void;
  loanCost: number;
  numberOfPanels: number;
  sysSizeKiloWatts: number;
  initialCost: number;
  averagePowerBill: number;
  offSetPowerbillPrice: number;
}

const LoanInfo: React.FC<LoanInfoProps> = ({
  open,
  squareFootage,
  handleClose,
  loanCost,
  numberOfPanels,
  sysSizeKiloWatts,
  initialCost,
  averagePowerBill,
  offSetPowerbillPrice,
}) => {
  const calculateLoanTerm = () => {
    const principalVal = loanCost;
    const termLength = -240;
    const interest = 0.0479 / 12;
    const loan =
      (principalVal * interest) / (1 - Math.pow(1 + interest, termLength));
    return Math.round(loan);
  };

  const calculateSavingsOverLife = () => {
    const calculateBill = calculateYearlyBill(averagePowerBill);
    const loanterm = calculateLoanTerm();
    const totalMonthlyLoan = loanterm * 240;
    const totalDifferenceInSavings = calculateBill - totalMonthlyLoan;
    return totalDifferenceInSavings;
  };

  //this is the same function from Graph.js but the client wanted this calculation to show
  // in the total amount saved card component, removed the array and just returned sum
  const calculateYearlyBill = (averagePowerBill: number) => {
    const totalYearsSolar = 25;
    let curentPowerBillTrend = 0;
    let floatingPointHack = 0;
    let totalAverage = averagePowerBill * 12;
    let runningTotal = 0;

    // each "year", we add 5.5% to the total bill to adjust for
    // rises in utility/power costs
    for (let i = 0; i <= totalYearsSolar; i++) {
      curentPowerBillTrend = totalAverage * 0.055;
      totalAverage = (totalAverage * 10 + curentPowerBillTrend * 10) / 10;
      floatingPointHack = totalAverage.toFixed(2);
      runningTotal = (runningTotal * 10 + floatingPointHack * 10) / 10;
    }

    return runningTotal;
  };

  const loanTerm = calculateLoanTerm();

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={true}
        fullWidth={true}
        maxWidth="lg"
      >
        <div style={{ position: "relative" }} onClick={handleClose}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{
              position: "absolute",
              top: 0,
              left: 15,
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <DialogTitle id="alert-dialog-title">
          <div
            style={{
              paddingTop: "25px",
              paddingLeft: "25px",
              paddingRight: "25px",
            }}
          >
            <Typography align="left" variant="h4" style={styles.fontStyles}>
              You have selected:{"  "}
              <strong>
                <CountUp
                  useEasing={true}
                  end={parseInt(squareFootage)}
                  duration={3}
                  suffix=" sq. feet"
                />
              </strong>
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent style={styles.dialogueStyle}>
          <Card style={styles.cardStyle}>
            <CardContent>
              <Typography variant="h4" style={{ fontWeight: "300" }}>
                <CountUp
                  prefix="$"
                  end={calculateSavingsOverLife()}
                  duration={4}
                />
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ fontWeight: "300" }}
              >
                Estimated savings over 25 years, when comparing your avg.
                monthly power bill of <strong>${averagePowerBill}</strong> to{" "}
                <strong>${loanTerm}</strong>:{" "}
              </Typography>
            </CardContent>
          </Card>

          <Card style={styles.cardStyle}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "no-wrap",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "45%" }}>
                {" "}
                <Typography variant="h5" style={{ fontWeight: "300" }}>
                  <CountUp
                    useEasing={true}
                    end={loanTerm}
                    duration={4}
                    prefix="$"
                  />
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ fontWeight: "300" }}
                >
                  Estimated New Monthly Loan Payment{" "}
                </Typography>
              </div>

              <img
                style={{ width: "10%", margin: "5px" }}
                src={arrow}
                alt="arrow"
              />

              <div style={{ width: "30%" }}>
                {" "}
                <Typography variant="h5" style={{ fontWeight: "300" }}>
                  <CountUp
                    useEasing={true}
                    end={averagePowerBill - loanTerm}
                    duration={4}
                    prefix="$"
                  />
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ fontWeight: "300" }}
                >
                  Monthly Savings{" "}
                </Typography>
              </div>
            </CardContent>
          </Card>

          <Card style={styles.cardStyle}>
            <CardContent>
              <Typography variant="h4" style={{ fontWeight: "300" }}>
                <CountUp
                  useEasing={true}
                  end={sysSizeKiloWatts}
                  duration={4}
                  suffix=" kW"
                />
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ fontWeight: "300" }}
              >
                Total System Size in kW for{" "}
                <strong>{Math.round(squareFootage)}</strong> sqft roof:
              </Typography>
            </CardContent>
          </Card>

          <Card style={styles.cardStyle}>
            <CardContent>
              <Typography variant="h4" style={{ fontWeight: "300" }}>
                <CountUp
                  useEasing={true}
                  end={numberOfPanels}
                  duration={5}
                  suffix=" panels"
                />
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ fontWeight: "300" }}
                gutterBottom
              >
                Approximate # of Panels needed to offset Avg. Yearly Power Bill
                of <strong>${averagePowerBill * 12}</strong>{" "}
              </Typography>
            </CardContent>
          </Card>

          <Card style={styles.graphCardStyle}>
            <CardContent>
              <Graph
                graphType="Pie"
                total={initialCost}
                moneySaved={loanCost}
                averagePowerBill={averagePowerBill * 12}
                offSetPowerbillPrice={offSetPowerbillPrice}
              />
            </CardContent>
          </Card>

          <Card style={styles.graphCardStyle}>
            <CardContent>
              <Graph
                graphType="Line"
                total={initialCost}
                moneySaved={loanCost}
                averagePowerBill={averagePowerBill}
                yearlyLoanCost={loanTerm}
              />
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            color="textSecondary"
            style={{ textDecoration: "none", fontSize: "1em" }}
          ></Typography>
          <p className="antialiased	text-lg text-slate-800 pt-8">
            Disclosure: This is just a demo version of the product I built for a
            client! I'm not storing any info or keeping any data, just wanted to
            show off this cool tool :D{" "}
          </p>

          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoanInfo;
