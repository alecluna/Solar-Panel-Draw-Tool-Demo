import Tutorial from "../Tutorial";

const HowToUse = () => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="antialiased text-3xl font-bold text-center pb-6">
          My Solar Cost Demo Tool
        </h1>

        <p className="antialiased	text-xl	font-semibold text-slate-800 pb-2">
          How to Use:
        </p>

        <p className="antialiased	text-lg text-slate-800 pb-8">
          Use your mouse and click on the four corners of your rooftop. This
          will calculate the area you would like to place your solar panels!
        </p>
      </div>

      <div>
        <Tutorial />
      </div>
    </>
  );
};

export default HowToUse;
