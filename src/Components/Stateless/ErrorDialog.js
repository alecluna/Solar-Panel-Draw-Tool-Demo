import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ErrorDialog = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
