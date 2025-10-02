
import React, { useState } from 'react';
import PencilIcon from '../ui/PencilIcon';
import TrashIcon from '../ui/TrashIcon';
import PlusIcon from '../ui/PlusIcon';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'ㅇㄴㄹㅇㄹ', completed: false },
    { id: 2, text: 'ㄴㅇㄹㄴㅇㄹ', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [activeTab, setActiveTab] = useState('오늘');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">포커스 리스트</h1>
          <p className="text-gray-500 mt-2">집중해야 할 일들을 관리하세요</p>
        </div>

        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('오늘')}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === '오늘'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            오늘
          </button>
          <button
            onClick={() => setActiveTab('내일')}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === '내일'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            내일
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center p-4 border rounded-lg"
            >
              <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-4 flex-1 text-gray-800">{task.text}</span>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <PencilIcon />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center border rounded-lg p-2 shadow-sm">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="새로운 할 일 추가..."
            className="flex-1 border-0 focus:ring-0"
          />
          <button
            onClick={handleAddTask}
            className="p-2 bg-blue-600 text-white rounded-full"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
