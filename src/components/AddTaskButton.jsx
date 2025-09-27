import React from 'react';
import PlusIcon from '../assets/plus.svg';

const AddTaskButton = () => {
  return (
    <button className="fixed bottom-24 right-8 bg-sky-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-sky-600">
      <img src={PlusIcon} alt="Add Task" className="w-8 h-8" />
    </button>
  );
};

export default AddTaskButton;
