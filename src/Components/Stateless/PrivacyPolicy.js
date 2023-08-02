import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@material-ui/core";
import "../../Styles/animation.css";

const PrivacyPolicy = ({ togglePrivacyPolicy, privacyPolicy }) => (
  <Dialog
    fullScreen
    open={privacyPolicy}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    disableEscapeKeyDown={true}
    disableBackdropClick={true}
    fullWidth={true}
    className="animate"
  >
    <DialogContent
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "10px"
      }}
    >
      <div>
        <Typography variant="h4" gutterBottom>
          Disclosure:
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          All information and figures being displayed are estimations only, and
          based on the information entered by the user. Actual system sizing,
          savings, payments, etc. may differ once you receive a full energy
          analysis and proposal from eFlow Solar Energy.
        </Typography>
      </div>

      <div>
        <Typography variant="h4" gutterBottom>
          Notice:
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          By clicking “Agree” you are accepting the terms of eFlow Solar
          Energy’s Privacy Policy.
        </Typography>
      </div>
      <div>
        <Typography variant="h4" gutterBottom>
          Privacy Policy:
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Privacy Policy Protecting your private information is our priority.
          This Statement of Privacy applies to{" "}
          <a href="https://mysolar-cost.com">https://mysolar-cost.com</a> and
          eFlow Solar Energy and governs data collection and usage. For the
          purposes of this Privacy Policy, unless otherwise noted, all
          references to eFlow Solar Energy include https://mysolar-cost.com,
          eFlow Energy and{" "}
          <a href="https://www.eflowenergy.com">https://www.eflowenergy.com.</a>
          The eFlow Energy website is a news and information site. By using the
          eFlow Energy website, you consent to the data practices described in
          this statement.
        </Typography>

        <Typography variant="h6" color="textPrimary" gutterBottom>
          Collection of your Personal Information
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          In order to better provide you with products and services offered on
          our Site, eFlow Energy may collect personally identifiable
          information, such as your:
        </Typography>
        <ul style={{ listStyle: "none" }}>
          <li>First and Last Name</li>
          <li>Mailing Address</li>
          <li>E-mail Address</li>
          <li>Phone Number</li>
          <li>Average Monthly Power Bill</li>
        </ul>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          We do not collect any personal information about you unless you
          voluntarily provide it to us. However, you may be required to provide
          certain personal information to us when you elect to use certain
          products or services available on the Site. These may include: (a)
          registering for an account on our Site; (b) entering a sweepstakes or
          contest sponsored by us or one of our partners; (c) signing up for
          special offers from selected third parties; (d) sending us an email
          message; (e) submitting your credit card or other payment information
          when ordering and purchasing products and services on our Site. To
          wit, we will use your information for, but not limited to,
          communicating with you in relation to services and/or products you
          have requested from us. We also may gather additional personal or
          non-personal information in the future.
        </Typography>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Use of your Personal Information
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          eFlow Energy collects and uses your personal information to operate
          its website(s) and deliver the services you have requested.
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          eFlow Energy may also use your personally identifiable information to
          inform you of other products or services available from eFlow Energy
          and its affiliates.
        </Typography>

        <Typography variant="h6" color="textPrimary" gutterBottom>
          Sharing Information with Third Parties
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          eFlow Energy does not sell, rent or lease its customer lists to third
          parties. <br /> eFlow Energy may share data with trusted partners to
          help perform statistical analysis, send you email or postal mail,
          provide customer support, or arrange for deliveries. All such third
          parties are prohibited from using your personal information except to
          provide these services to eFlow Energy, and they are required to
          maintain the confidentiality of your information. - First and Last
          Name - Mailing Address - E-mail Address - Phone Number - Average
          Monthly Power Bill This is a RocketLawyer.com document. Page 1 of 3
          eFlow Energy may disclose your personal information, without notice,
          if required to do so by law or in the good faith belief that such
          action is necessary to: (a) conform to the edicts of the law or comply
          with legal process served on eFlow Energy or the site; (b) protect and
          defend the rights or property of eFlow Energy; and/or (c) act under
          exigent circumstances to protect the personal safety of users of eFlow
          Energy, or the public.
        </Typography>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Automatically Collected Information
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Information about your computer hardware and software may be
          automatically collected by eFlow Energy. This information can include:
          your IP address, browser type, domain names, access times and
          referring website addresses. This information is used for the
          operation of the service, to maintain quality of the service, and to
          provide general statistics regarding use of the eFlow Energy website.
        </Typography>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Security of your Personal Information
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          eFlow Energy secures your personal information from unauthorized
          access, use, or disclosure. eFlow Energy uses the following methods
          for this purpose:
        </Typography>
        <ul> - SSL Protocal</ul>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          When personal information (such as a credit card number) is
          transmitted to other websites, it is protected through the use of
          encryption, such as the Secure Sockets Layer (SSL) protocol.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          We strive to take appropriate security measures to protect against
          unauthorized access to or alteration of your personal information.
          Unfortunately, no data transmission over the Internet or any wireless
          network can be guaranteed to be 100% secure. As a result, while we
          strive to protect your personal information, you acknowledge that: (a)
          there are security and privacy limitations inherent to the Internet
          which are beyond our control; and (b) security, integrity, and privacy
          of any and all information and data exchanged between you and us
          through this Site cannot be guaranteed.
        </Typography>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Children Under Thirteen
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          eFlow Energy does not knowingly collect personally identifiable
          information from children under the age of thirteen. If you are under
          the age of thirteen, you must ask your parent or guardian for
          permission to use this website.
        </Typography>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          E-mail Communications
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          From time to time, eFlow Energy may contact you via email for the
          purpose of providing announcements, promotional offers, alerts,
          confirmations, surveys, and/or other general communication.
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          If you would like to stop receiving marketing or promotional
          communications via email from eFlow Energy, you may opt out of such
          communications by emailing info@eflow.biz and "replying STOP".
        </Typography>

        <Typography variant="h6" color="textPrimary" gutterBottom>
          Changes to this Statement
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          eFlow Energy reserves the right to change this Privacy Policy from
          time to time. We will notify you about significant changes in the way
          we treat personal information by sending a notice to the primary email
          address specified in your account, by placing a prominent notice on
          our site, and/or by updating any privacy information on this page.
          Your continued use of the Site and/or Services available through this
          Site after such modifications will constitute your: (a) acknowledgment
          of the modified Privacy Policy; and (b) agreement to abide and be
          bound by that Policy.{" "}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Contact Information eFlow Energy welcomes your questions or comments
          regarding this Statement of Privacy. If you believe that eFlow Energy
          has not adhered to this Statement, please contact eFlow Energy at:
          <ul>
            <li>eFlow Solar Energy</li> <li>3330 Main Street Suite C</li>{" "}
            <li>Oakley, California 94561</li>
            <li>
              Email Address: <br />
              info@eflow.biz
            </li>
            <li>
              Telephone number: <br />
              (888) 305-7652
            </li>
            <li> Effective as of July 14, 2019</li>
          </ul>
        </Typography>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={togglePrivacyPolicy} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default PrivacyPolicy;
