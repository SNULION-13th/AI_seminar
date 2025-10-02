import React from 'react';
import CheckIcon from '../ui/CheckIcon';

const RoutineItem = ({ name, days, completed, onToggle, remainingTime }) => (
  <div
    onClick={onToggle}
    className={`p-4 rounded-lg shadow-sm flex items-center justify-between cursor-pointer transition-colors duration-300 ${
      completed ? 'bg-blue-50' : 'bg-white'
    }`}
  >
    <div>
      <div className="flex items-center space-x-3">
        <h3
          className={`font-semibold transition-colors duration-300 ${
            completed ? 'text-blue-500' : 'text-gray-800'
          }`}
        >
          {name}
        </h3>
        {!completed && <span className="text-xs text-gray-400">{remainingTime}</span>}
      </div>
      <div className="flex space-x-1 mt-2">
        {days.map((day) => (
          <span
            key={day}
            className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
          >
            {day}
          </span>
        ))}
      </div>
    </div>
    <CheckIcon completed={completed} />
  </div>
);

export default RoutineItem;

