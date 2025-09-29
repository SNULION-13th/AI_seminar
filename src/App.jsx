
import React from 'react';
import modeToggleIcon from './assets/mode-toggle.svg';
import addIcon from './assets/add-icon.svg';

function App() {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-blue-600">ClearList</h1>
              <button className="bg-gray-200 rounded-full p-2">
                <img src={modeToggleIcon} alt="Mode Toggle" className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-gray-500 text-sm">{dateString}</p>
          </div>

          <form className="flex items-center mb-6">
            <input
              type="text"
              placeholder="오늘 무엇을 할까요?"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="ml-4 p-3 rounded-lg">
              <img src={addIcon} alt="Add Task" className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center text-gray-500 py-10">
            <p>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
