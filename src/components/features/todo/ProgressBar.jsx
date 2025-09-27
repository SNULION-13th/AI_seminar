
const ProgressBar = ({ progress }) => {
  return (
    <div className="px-6 pb-4">
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div
          className="bg-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
