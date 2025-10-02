import React from 'react';

const CalendarGrid = ({ currentDate, selectedDate, onDateClick, plans }) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  const dates = [];
  let currentDateIterator = new Date(startDate);

  while (currentDateIterator <= endDate) {
    dates.push(new Date(currentDateIterator));
    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }

  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const today = new Date();

  return (
    <div>
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-px text-center text-sm font-semibold text-gray-600 border-b border-gray-200">
        {daysOfWeek.map(day => (
          <div key={day} className={`py-2 ${day === '일' ? 'text-red-500' : ''}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-px">
        {dates.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);

          let cellClasses = "relative py-4 text-center cursor-pointer transition-colors duration-200 ease-in-out ";
          let textClasses = "relative z-10 ";

          if (isCurrentMonth) {
            if (isSelected) {
              cellClasses += "bg-blue-100";
            } else {
              cellClasses += "bg-white hover:bg-gray-100";
            }
            textClasses += date.getDay() === 0 ? 'text-red-500' : 'text-gray-800';
          } else {
            cellClasses += "bg-white text-gray-400 opacity-50";
          }
          
          const dateKey = date.toISOString().split('T')[0];
          const dayPlans = (plans && plans[dateKey]) || [];

          return (
            <div
              key={index}
              className={cellClasses}
              onClick={() => onDateClick(date)}
            >
              <span className={textClasses}>
                <span className={`relative z-10`}>
                  {date.getDate()}
                </span>
              </span>
              {dayPlans.length > 0 && isCurrentMonth && (
                <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
                  {dayPlans.map((plan) => (
                    <span key={plan.id} className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
