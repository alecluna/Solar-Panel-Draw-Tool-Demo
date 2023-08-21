import { useFormik, Form, Field, FormikProvider } from "formik";
import * as yup from "yup";
import { Typography, List, ListItem, Button } from "@material-ui/core";
import form from "../../Styles/form";

type UpdateAveragePowerBill = (averagePowerBill: number) => void;

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
      updateAveragePowerBill(parseInt(averageYearlyPowerBill));
      updateLocation(buildLoc);
    }
  };

  const { touched, errors } = formik;

  const getErrors = () => {
    switch (
      (touched.avgBill && errors.avgBill) ||
      (touched.address && errors.address) ||
      (touched.city && errors.city) ||
      (touched.state && errors.state)
    ) {
      case errors.avgBill:
        return (
          <Typography color="error" style={form.formatErrors}>
            {errors.avgBill}
          </Typography>
        );

      case errors.address:
        return (
          <Typography color="error" style={form.formatErrors}>
            {errors.address}
          </Typography>
        );

      case errors.city:
        return (
          <Typography color="error" style={form.formatErrors}>
            {errors.city}
          </Typography>
        );

      case errors.state:
        return (
          touched.state &&
          errors.state && (
            <Typography color="error" style={form.formatErrors}>
              {errors.state}
            </Typography>
          )
        );

      default:
        return null;
    }
  };

  return (
    <div style={form.formatList}>
      <div>
        <Typography
          variant="h5"
          color="textPrimary"
          style={{ fontWeight: "bold", marginBottom: 24 }}
        >
          {" "}
          Start here by locating your property{" "}
        </Typography>
        <Typography variant="h6" color="textPrimary">
          <strong>Note:</strong> Do not include gas usage in your average bill.
        </Typography>
      </div>
      {getErrors()}

      <FormikProvider value={formik}>
        <Form>
          <List>
            <ListItem></ListItem>
            <ListItem>
              <Field
                style={form.textArea}
                placeholder="Avg. Monthly Power Bill"
                {...formik.getFieldProps("avgBill")}
              />
            </ListItem>

            <ListItem>
              <Field
                style={form.textArea}
                placeholder="Address"
                {...formik.getFieldProps("address")}
              />
            </ListItem>

            <ListItem>
              <Field
                style={form.textArea}
                placeholder="City"
                {...formik.getFieldProps("city")}
              />
            </ListItem>

            <ListItem>
              <Field
                style={form.textArea}
                placeholder="State"
                {...formik.getFieldProps("state")}
              />
            </ListItem>

            <Button style={form.buttonStyles} type="submit">
              <Typography> Let's get started</Typography>
            </Button>
          </List>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default SubmitAddressInfo;
