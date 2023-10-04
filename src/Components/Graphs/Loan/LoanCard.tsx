// import CountUp from "react-countup";

interface LoanCardProps {
  children: React.ReactNode;
}

const LoanCard: React.FC<LoanCardProps> = ({ children }) => {
  return (
    <div className="h-125px shadow-md flex-none w-full md:w-1/2 min-w-0 p-2">
      {children}
    </div>
  );
};

export default LoanCard;
