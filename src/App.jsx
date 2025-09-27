import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const remainingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-700 p-4 rounded-t-xl flex items-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-2 mr-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M9 2L16 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 4H19V22H5V4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 11H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 16H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 11L9.01 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 16L9.01 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-white text-xl font-bold">ClearList</h1>
          </div>

          <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex justify-between text-xs">
            <div className="flex items-center">
              <span className="font-medium text-blue-600 mr-2">
                {remainingTasks}
              </span>
              <span className="text-gray-500">남은 할 일</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-green-600 mr-2">
                {completedTasks}
              </span>
              <span className="text-gray-500">완료됨</span>
            </div>
          </div>

          <div className="p-6">
            <form
              onSubmit={addTask}
              className="flex items-center border border-gray-200 rounded-lg shadow-sm"
            >
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="할 일을 입력하세요"
                className="flex-grow p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded-r-lg flex items-center font-semibold hover:bg-blue-600 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M3.75 9H14.25"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 3.75V14.25"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                추가
              </button>
            </form>
          </div>

          <div className="px-6 pb-6">
            {tasks.length === 0 ? (
              <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="flex justify-center items-center mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 4L32 4"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 8H40V44H8V8Z"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 22H32"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 32H32"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 22L16.02 22"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 32L16.02 32"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-semibold">할 일이 없습니다.</p>
                <p className="text-gray-400 text-sm mt-1">
                  새로운 할 일을 추가해보세요!
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span
                      className={`flex-grow mx-4 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {task.text}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-4">
          데이터는 브라우저에 자동으로 저장됩니다
        </p>
      </div>
    </div>
  );
}

export default App;
