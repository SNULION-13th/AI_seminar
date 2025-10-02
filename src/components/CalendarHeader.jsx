import React from 'react';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  
  const year = currentDate.getFullYear();
  const month = monthNames[currentDate.getMonth()];

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        {year}년 {month}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Previous month"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Next month"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
