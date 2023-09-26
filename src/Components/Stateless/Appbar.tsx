import solarPanel from "./../../assets/solar-panel-svgrepo-com.svg";

const DrawToolAppBar: React.FC = ({ setShowMapBox }) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
                src={solarPanel}
                alt="Solar panel draw tool"
                onClick={() => {
                  setShowMapBox(false);
                }}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block"></div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <p className="text-xl text-black font-medium">This is a Demo</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawToolAppBar;
