// import CountUp from "react-countup";

interface LoanCardProps {
  children: React.ReactNode;
}

const LoanCard: React.FC<LoanCardProps> = ({ children }) => {
  return (
    <div className="flex-none w-full md:w-1/2 min-w-0 p-2">
      <div className="h-full shadow-md">{children}</div>
    </div>
  );
};

export default LoanCard;
