/*
 * This component is the form and validation
 * on the left hand panel
 */
import { Typography, List, ListItem, Button } from "@material-ui/core";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import form from "../Styles/form";

const styles = {
  formatList: {
    paddingTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  formatErrors: {
    padding: "0px 20px 5px 20px",
  },
};

const AveragePowerBill = ({ errors, touched }) => {
  return (
    <div style={styles.formatList}>
      <List>
        <form>
          <ListItem>
            <Typography variant="body2" color="textPrimary">
              <strong>Note:</strong> Do not include gas usage in your average
              bill.
            </Typography>
          </ListItem>
          <ListItem>
            <Field
              style={form.textArea}
              placeholder="Avg. Monthly Power Bill"
              name="avgBill"
            />
          </ListItem>
          <div style={styles.formatErrors}>
            {touched.avgBill && errors.avgBill && (
              <Typography color="error">{errors.avgBill}</Typography>
            )}
          </div>
          <ListItem>
            <Field style={form.textArea} placeholder="Address" name="address" />
          </ListItem>
          <div style={styles.formatErrors}>
            {touched.address && errors.address && (
              <Typography color="error">{errors.address}</Typography>
            )}
          </div>
          <ListItem>
            <Field style={form.textArea} placeholder="City" name="city" />
          </ListItem>
          <div style={styles.formatErrors}>
            {touched.city && errors.city && (
              <Typography color="error">{errors.city}</Typography>
            )}
          </div>
          <ListItem>
            <Field style={form.textArea} placeholder="State" name="state" />
          </ListItem>
          <div style={styles.formatErrors}>
            {touched.state && errors.state && (
              <Typography color="error">{errors.state}</Typography>
            )}
          </div>
          <Button style={form.buttonStyles} type="submit">
            <Typography> Let's get started</Typography>
          </Button>
        </form>
      </List>
      <Button variant="text">
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ textDecoration: "underline" }}
        >
          Disclosure: This is just a demo version of the product I built for a
          client! I'm not storing any info or keeping any data, just wanted to
          show off this cool tool :D
        </Typography>
      </Button>
    </div>
  );
};

const FormikAverageBill = withFormik({
  mapPropsToValues({ avgBill, address, city, state }) {
    return {
      avgBill: avgBill || "",
      address: address || "",
      city: city || "",
      state: state || "",
    };
  },
  validationSchema: yup.object().shape({
    avgBill: yup
      .number()
      .max(800, "Error: monthly bill must be less than $800")
      .positive("Error: Average Bill must not be negative")
      .integer("Error: Average Bill must be a number, no decimals")
      .required("Error: Average Bill is required")
      .typeError("Error: you must specify a number"),
    address: yup
      .string("Error: must be a valid Address")
      .max(60, "Error: must be a valid Address")
      .required("Error: Address is required")
      .typeError("Error: must be a valid address")
      .trim(),
    city: yup
      .string("Error: must be a valid City")
      .max(120, "Error: input is too long")
      .required("City is required")
      .trim(),
    state: yup
      .string("Error: must by a valid State")
      .max(100, "Error: input is too long")
      .required("State is required")
      .trim(),
  }),
  handleSubmit(values, { props: { updateAveragePowerBill, updateLocation } }) {
    const { address, city, avgBill, state } = values;
    if (address && city && avgBill && state) {
      const buildLoc = `${address.trim()} ${city.trim()} ${state.trim()}`;
      const averageYearlyPowerBill = avgBill;
      updateAveragePowerBill(averageYearlyPowerBill);
      updateLocation(buildLoc);
    } else {
      return null;
    }
  },
})(AveragePowerBill);

export default FormikAverageBill;
