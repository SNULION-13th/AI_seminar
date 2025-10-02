import React from 'react';
import CheckGrayIcon from '../assets/check_gray.svg';
import CheckGreenIcon from '../assets/check_green.svg';
import KebabMenuIcon from '../assets/kebab_menu.svg';

const TodoItem = ({ title, category, categoryColor, isCompleted }) => {
  const textColor = isCompleted ? 'text-gray-400' : 'text-gray-800';
  const textDecoration = isCompleted ? 'line-through' : 'none';

  return (
    <div className={`bg-white shadow-sm rounded-lg p-4 mb-3 ${isCompleted ? 'bg-opacity-70' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`font-medium ${textColor}`} style={{ textDecoration }}>{title}</p>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-slate-500 mr-2">오늘</span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${categoryColor}`}>{category}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <img src={isCompleted ? CheckGreenIcon : CheckGrayIcon} alt="Complete" className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <img src={KebabMenuIcon} alt="Menu" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
