import { useState } from "react";
import "./App.css";
import plusIcon from "./assets/plus-icon.svg";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md h-[860px] bg-white shadow-sm flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-medium text-gray-900">Flow Task</h1>
          <p className="text-sm text-gray-500 mt-1">2025년 9월 27일 토요일</p>
          <p className="text-sm font-medium text-indigo-600 mt-2">
            지금 이 순간에 집중하세요.
          </p>
        </div>

        {/* Body */}
        <div className="flex-grow p-4 overflow-y-auto">
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-3 my-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                      className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span
                      className={`ml-3 text-gray-800 ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center flex flex-col justify-center items-center h-full">
              <p className="text-sm text-gray-400">
                오늘 할 일을 추가해보세요.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                생각의 속도로 기록하고, 중요한 일에만 집중하세요.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="무엇을 해야 하나요? (#태그 추가 가능)"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full h-[50px] pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddTask}
              className="absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <img src={plusIcon} alt="Add task" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
