interface Dialog {
  handleClose: () => void;
}

interface LoanDialogProps extends Pick<Dialog, "handleClose"> {
  children: React.ReactNode;
}

interface ErrorDialogProps extends Pick<Dialog, "handleClose"> {
  title: string;
  message: string;
}

export type { LoanDialogProps, ErrorDialogProps };
