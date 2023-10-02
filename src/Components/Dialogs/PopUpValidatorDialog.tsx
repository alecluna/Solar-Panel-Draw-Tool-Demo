// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Button,
//   p,
// } from "@material-ui/core";
// import form from "../../Styles/form";
// import { useFormik, Form, Field, FormikProvider } from "formik";
// import * as yup from "yup";
// import CountUp from "react-countup";

// const styles = {
//   fontStyles: {
//     fontWeight: "300",
//   },
// };

// const PopUpValidatorDialog = ({
//   open,
//   handleClose,
//   squareFootage,
//   toggleEmailProvided,
//   calculateSystemSize,
//   toggleOpenLoanInfo,
//   formikPayload,
// }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: formikPayload.name || "",
//       phoneNumber: formikPayload.phoneNumber || "",
//       email: formikPayload.email || "",
//       agree: false,
//     },
//     validationSchema: yup.object().shape({
//       name: yup
//         .string()
//         .max(20)
//         .typeError("your name must cannot contian numbers"),
//       phoneNumber: yup
//         .string()
//         .matches(phoneRegExp, "Phone number is not valid"),
//       email: yup
//         .string()
//         .email("must be an email address")
//         .required("an email address is required")
//         .typeError("you must specify an email"),
//       agree: yup.bool().oneOf([true], "Checkbox must be checked"),
//     }),
//     handleSubmit(values) {
//       const buildEmail = `${values.email}`;
//       const phoneNumber = values.phoneNumber;
//       const name = values.name;

//       toggleEmailProvided(phoneNumber, name, buildEmail);
//       calculateSystemSize();
//       toggleOpenLoanInfo();
//     },
//   });

//   const { touched, errors } = formik;

//   return (
//     <div>
//       <Dialog
//         open={open}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         disableEscapeKeyDown={true}
//         fullWidth={true}
//         className="animate"
//       >
//         <DialogContent>
//           <div
//             style={{
//               paddingTop: "25px",
//               paddingLeft: "25px",
//               paddingRight: "25px",
//             }}
//           >
//             <p align="center" variant="h4" style={styles.fontStyles}>
//               You have selected:{"  "}
//               <strong>
//                 <CountUp
//                   useEasing={true}
//                   end={parseInt(squareFootage)}
//                   duration={3}
//                   suffix=" sq. feet"
//                 />
//               </strong>
//             </p>
//           </div>

//           <p
//             color="textSecondary"
//             variant="body2"
//             align="center"
//             style={{ padding: "15px" }}
//           >
//             <strong>Before we get started,</strong> please enter an email, or
//             close this window to start over.
//           </p>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               flexWrap: "wrap",
//               justifyContent: "center",
//             }}
//           >
//             <FormikProvider value={formik}>
//               <Form>
//                 <Field
//                   style={form.textArea}
//                   placeholder="Name (optional)"
//                   {...formik.getFieldProps("name")}
//                 />
//                 {touched.name && errors.name && (
//                   <p color="error">{errors.name}</p>
//                 )}
//                 <Field
//                   style={form.textArea}
//                   placeholder="Phone Number (optional)"
//                   {...formik.getFieldProps("phoneNumber")}
//                 />
//                 {touched.phoneNumber && errors.phoneNumber && (
//                   <p color="error">{errors.phoneNumber}</p>
//                 )}
//                 <Field
//                   style={form.textArea}
//                   placeholder="Email"
//                   {...formik.getFieldProps("email")}
//                 />
//                 {touched.email && errors.email && (
//                   <p color="error">{errors.email}</p>
//                 )}
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     flexWrap: "nowrap",
//                     padding: "5px",
//                   }}
//                 >
//                   {" "}
//                   <div style={{ padding: "5px" }}>
//                     {" "}
//                     <Field type="checkbox" name="agree" />
//                   </div>
//                   <div
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {" "}
//                     <p color="textSecondary">
//                       By clicking the checkbox you are{" "}
//                       <strong>accepting</strong> the terms of eFlow Solar
//                       Energy’s{" "}
//                       <Button>
//                         <p
//                           color="textSecondary"
//                           style={{
//                             textDecoration: "underline",
//                             fontSize: "12px",
//                           }}
//                         >
//                           Disclosure: This is just a demo version of the product
//                           I built for a client! I'm not storing any info and
//                           keeping any data, just wanted to show off this cool
//                           tool :D{" "}
//                         </p>
//                       </Button>
//                     </p>
//                   </div>
//                 </div>

//                 {touched.agree && errors.agree && (
//                   <p color="error">{errors.agree}</p>
//                 )}
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     width: "100%",
//                   }}
//                 >
//                   <Button
//                     type="submit"
//                     align="center"
//                     style={form.buttonStyles}
//                   >
//                     Calculate My Savings
//                   </Button>
//                 </div>
//               </Form>
//             </FormikProvider>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} style={{ color: "#3c78dd" }}>
//             Start Over
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// export default PopUpValidatorDialog;
