import React from 'react';
import StarYellowIcon from '../assets/star_yellow.svg';
import CheckGrayIcon from '../assets/check_gray.svg';
import StarGrayIcon from '../assets/star_gray.svg';

const TodayFocus = () => {
  return (
    <div className="p-4 w-full">
      <div className="flex items-center mb-2">
        <img src={StarYellowIcon} alt="Focus" className="w-4 h-4 mr-2" />
        <h2 className="text-sm font-medium text-slate-500">오늘의 집중</h2>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-sky-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base font-medium text-gray-800">기획안 제출</p>
            <div className="mt-2">
              <span className="text-xs font-medium bg-sky-50 text-sky-600 px-2 py-1 rounded">#업무</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <img src={CheckGrayIcon} alt="Complete" className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <img src={StarGrayIcon} alt="Unfocus" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayFocus;
