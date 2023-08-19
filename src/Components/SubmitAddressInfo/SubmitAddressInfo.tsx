import { useFormik, Form, Field, FormikProvider } from "formik";
import * as yup from "yup";
import { Typography, List, ListItem, Button } from "@material-ui/core";
import form from "../../Styles/form";

type UpdateAveragePowerBill = (
  averagePowerBill: Partial<number | string>
) => void;
type UpdateLocation = (location: Partial<string>) => void;

interface SubmitAddressInfoProps {
  updateAveragePowerBill: UpdateAveragePowerBill;
  updateLocation: UpdateLocation;
}

interface Values {
  avgBill: string;
  address: string;
  city: string;
  state: string;
}

const SubmitAddressInfo: React.FC<SubmitAddressInfoProps> = ({
  updateAveragePowerBill,
  updateLocation,
}) => {
  const formik = useFormik({
    initialValues: {
      avgBill: "",
      address: "",
      city: "",
      state: "",
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
        .string()
        .max(60, "Error: must be a valid Address")
        .required("Error: Address is required")
        .typeError("Error: must be a valid address")
        .trim(),
      city: yup
        .string()
        .max(120, "Error: input is too long")
        .required("City is required")
        .trim(),
      state: yup
        .string()
        .max(100, "Error: input is too long")
        .required("State is required")
        .trim(),
    }),
    onSubmit: (values) => onSubmitFormikForm(values),
  });

  const onSubmitFormikForm = (values: Values) => {
    const { address, city, avgBill, state } = values;
    if (address && city && avgBill && state) {
      const buildLoc = `${address.trim()} ${city.trim()} ${state.trim()}`;
      const averageYearlyPowerBill = avgBill;
      updateAveragePowerBill(averageYearlyPowerBill);
      updateLocation(buildLoc);
    }
  };

  const { touched, errors } = formik;
  return (
    <div style={form.formatList}>
      <Typography
        variant="h5"
        color="textPrimary"
        style={{ fontWeight: "bold", marginBottom: 24 }}
      >
        {" "}
        Start here by locating your property{" "}
      </Typography>

      <FormikProvider value={formik}>
        <Form>
          <List>
            <ListItem>
              <Typography variant="h6" color="textPrimary">
                <strong>Note:</strong> Do not include gas usage in your average
                bill.
              </Typography>
            </ListItem>
            <ListItem>
              <Field
                style={form.textArea}
                placeholder="Avg. Monthly Power Bill"
                {...formik.getFieldProps("avgBill")}
              />
            </ListItem>
            {touched.avgBill && errors.avgBill && (
              <Typography color="error" style={form.formatErrors}>
                {errors.avgBill}
              </Typography>
            )}

            <ListItem>
              <Field
                style={form.textArea}
                placeholder="Address"
                {...formik.getFieldProps("address")}
              />
            </ListItem>
            {touched.address && errors.address && (
              <Typography color="error" style={form.formatErrors}>
                {errors.address}
              </Typography>
            )}

            <ListItem>
              <Field
                style={form.textArea}
                placeholder="City"
                {...formik.getFieldProps("city")}
              />
            </ListItem>
            {touched.city && errors.city && (
              <Typography color="error" style={form.formatErrors}>
                {errors.city}
              </Typography>
            )}

            <ListItem>
              <Field
                style={form.textArea}
                placeholder="State"
                {...formik.getFieldProps("state")}
              />
            </ListItem>
            {touched.state && errors.state && (
              <Typography color="error" style={form.formatErrors}>
                {errors.state}
              </Typography>
            )}
            <Button style={form.buttonStyles} type="submit">
              <Typography> Let's get started</Typography>
            </Button>
          </List>
          <Button variant="text">
            <Typography
              onClick={() => null}
              variant="body2"
              color="textSecondary"
              style={{ textDecoration: "underline" }}
            >
              Disclosure: This is just a demo version of the product I built for
              a client! I'm not storing any info and keeping any data, just
              wanted to show off this cool tool :D{" "}
            </Typography>
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default SubmitAddressInfo;
