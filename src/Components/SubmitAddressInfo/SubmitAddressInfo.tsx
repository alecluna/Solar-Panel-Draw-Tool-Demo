import { useFormik, Form, Field, FormikProvider } from "formik";
import * as yup from "yup";

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
        return errors.avgBill;

      case errors.address:
        return errors.address;

      case errors.city:
        return errors.city;

      case errors.state:
        return errors.state;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="pt-8">
        <p className="antialiased	text-xl	font-semibold text-slate-800 pb-2">
          Start here by locating your property{" "}
        </p>
        <p className="antialiased	text-lg text-slate-800 pb-8">
          <strong>Note:</strong> Do not include gas usage in your average bill.
        </p>
      </div>

      <div style={{ display: "flex", width: "100%" }}>
        <p className="text-red-700 pb-4">{getErrors()}</p>
      </div>

      <FormikProvider value={formik}>
        <Form>
          <Field
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 pt-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
            placeholder="Avg. Monthly Power Bill"
            type="text"
            {...formik.getFieldProps("avgBill")}
          />

          <Field
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 pt-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
            placeholder="Address"
            {...formik.getFieldProps("address")}
          />

          <Field
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 pt-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
            placeholder="City"
            {...formik.getFieldProps("city")}
          />

          <Field
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 pt-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
            placeholder="State"
            {...formik.getFieldProps("state")}
          />

          <div className="pt-8">
            <button
              type="submit"
              className="max-[600px]:w-full md:w-1/2 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              <p className="antialiased	text-md text-slate-100">
                Let's get started
              </p>
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default SubmitAddressInfo;
