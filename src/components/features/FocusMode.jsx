import SettingsIcon from '../../assets/images/settings-icon.svg';
import FocusIcon from '../../assets/images/focus-icon.svg';

const FocusMode = () => {
  return (
    <div className="w-[512px] bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Flow
        </h1>
        <button>
          <img src={SettingsIcon} alt="Settings" className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col items-center text-center py-16 px-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <img src={FocusIcon} alt="Focus Mode" className="w-10 h-10" />
        </div>
        <h2 className="mt-8 text-2xl font-semibold text-gray-800">집중 모드</h2>
        <p className="mt-4 text-base text-gray-500">
          지금은 집중 모드 시간입니다. 모든 할 일을 <br />
          숨기고 현재에 집중하세요.
        </p>
        <a href="#" className="mt-12 text-sm font-semibold text-blue-600">
          지금 이 순간에 집중하세요
        </a>
      </div>
    </div>
  );
};

export default FocusMode;
