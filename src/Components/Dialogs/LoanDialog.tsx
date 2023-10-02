// import { handleKeyDown } from "../Utils/handleKeyDown";
import { LoanDialogProps } from "./types";

const LoanDialog: React.FC<LoanDialogProps> = ({ handleClose, children }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:pb-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-start justify-center  sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  onClick={handleClose}
                  tabIndex={0}
                  // onKeyDown={(e: KeyboardEvent) =>
                  //   handleKeyDown(e, handleClose)
                  // }
                >
                  <path d="M19.78 4.22a.75.75 0 0 0-1.06 0L12 10.94 5.28 4.22a.75.75 0 0 0-1.06 1.06L10.94 12l-6.72 6.72a.75.75 0 0 0 1.06 1.06L12 13.06l6.72 6.72a.75.75 0 0 0 1.06-1.06L13.06 12l6.72-6.72a.75.75 0 0 0 0-1.06z" />
                </svg>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDialog;
