import "./Celebration.css";

const Celebration = ({ clearCompleted }) => {
  return (
    <div className="celebration-container text-center p-8 bg-pink-500/10 flex flex-col items-center justify-center h-full">
      <div>
        <div className="text-2xl font-bold text-pink-800">오늘도 해냈군요!</div>
        <p className="text-pink-700 mt-2">멋진 하루였어요. 🎉</p>
      </div>
      <button
        onClick={clearCompleted}
        className="mt-6 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75 transition-all"
      >
        새로운 하루 시작하기
      </button>
    </div>
  );
};

export default Celebration;