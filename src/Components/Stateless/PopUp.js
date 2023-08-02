import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@material-ui/core";
import form from "../../Styles/form";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import CountUp from "react-countup";
import "../../Styles/animation.css";

const styles = {
  fontStyles: {
    fontWeight: "300"
  }
};
const PopUp = ({
  open,
  handleClose,
  errors,
  touched,
  squareFootage,
  togglePrivacyPolicy
}) => {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        fullWidth={true}
        className="animate"
      >
        <DialogContent>
          <div
            style={{
              paddingTop: "25px",
              paddingLeft: "25px",
              paddingRight: "25px"
            }}
          >
            <Typography align="center" variant="h4" style={styles.fontStyles}>
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

          <Typography
            color="textSecondary"
            variant="body2"
            align="center"
            style={{ padding: "15px" }}
          >
            <strong>Before we get started,</strong> please enter an email, or
            close this window to start over.
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            <Form>
              <Field
                style={form.textArea}
                placeholder="Name (optional)"
                name="name"
              />
              {touched.name && errors.name && (
                <Typography color="error">{errors.name}</Typography>
              )}
              <Field
                style={form.textArea}
                placeholder="Phone Number (optional)"
                name="phoneNumber"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Typography color="error">{errors.phoneNumber}</Typography>
              )}
              <Field style={form.textArea} placeholder="Email" name="email" />
              {touched.email && errors.email && (
                <Typography color="error">{errors.email}</Typography>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "no-wrap",
                  padding: "5px"
                }}
              >
                {" "}
                <div style={{ padding: "5px" }}>
                  {" "}
                  <Field type="checkbox" name="agree" />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  {" "}
                  <Typography color="textSecondary">
                    By clicking the checkbox you are <strong>accepting</strong>{" "}
                    the terms of eFlow Solar Energy’s{" "}
                    <Button variant="text" align="left" padding="0">
                      <Typography
                        onClick={togglePrivacyPolicy}
                        color="textSecondary"
                        style={{
                          textDecoration: "underline",
                          fontSize: "12px"
                        }}
                      >
                        Disclosure, Notice and Privacy Policy:
                      </Typography>
                    </Button>
                  </Typography>
                </div>
              </div>

              {touched.agree && errors.agree && (
                <Typography color="error">{errors.agree}</Typography>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%"
                }}
              >
                <Button type="submit" align="center" style={form.buttonStyles}>
                  Calculate My Savings
                </Button>
              </div>
            </Form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#3c78dd" }}>
            Start Over
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const PopUpValidator = withFormik({
  mapPropsToValues({ email, name, phoneNumber, agree }) {
    return {
      name: name || "",
      phoneNumber: phoneNumber || "",
      email: email || "",
      agree: agree || false
    };
  },
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .max(20)
      .typeError("your name must cannot contian numbers"),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    email: yup
      .string()
      .email("must be an email address")
      .required("an email address is required")
      .typeError("you must specify an email"),
    agree: yup.bool().oneOf([true], "Checkbox must be checked")
  }),
  handleSubmit(values, { props }) {
    let buildEmail = `${values.email}`;
    let phoneNumber = values.phoneNumber;
    let name = values.name;

    props.toggleEmailProvided(phoneNumber, name, buildEmail);
    props.calculateSystemSize();
    props.toggleOpenLoanInfo();
  }
})(PopUp);

export default PopUpValidator;
