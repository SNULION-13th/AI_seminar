import React from 'react';
import CalendarIcon from '../assets/calendar.svg';
import ListIcon from '../assets/list.svg';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <button className="flex flex-col items-center justify-center text-sky-500">
          <img src={CalendarIcon} alt="Today" className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">오늘</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-500 hover:text-sky-500">
          <img src={ListIcon} alt="All" className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">전체</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
