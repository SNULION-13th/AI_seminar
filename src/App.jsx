import { useState } from "react";
import "./App.css";
import { addTaskToNotion } from "./services/notionService";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "기깔나게 숨쉬기",
      completed: true,
      details: "숨을 쉴 때는 코로 들이마시고 입으로 내뱉는다.",
      dueDate: "2025-10-28",
    },
    {
      id: 2,
      text: "열심히 밥 먹기",
      completed: false,
      details: "",
      dueDate: "2025-09-29",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailText, setDetailText] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          details: "",
          dueDate: newDueDate,
        },
      ]);

      // Notion에 새 태스크의 이름과 마감일을 전송합니다.
      addTaskToNotion(newTask, newDueDate);

      setNewTask("");
      setNewDueDate("");
    }
  };

  const toggleTask = (id, e) => {
    e.stopPropagation();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setDetailText(task.details || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setDetailText("");
  };

  const handleSaveDetails = () => {
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id ? { ...task, details: detailText } : task
      )
    );
    closeModal();
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate) {
      return -1;
    }
    if (b.dueDate) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div className="bg-gradient-to-b from-pink-100 to-purple-100 min-h-screen flex items-center justify-center py-10">
        <div className="bg-white rounded-3xl border-4 border-pink-200 shadow-lg w-11/12 max-w-md h-auto p-1 pb-6">
          <div className="bg-pink-200 flex justify-center items-center py-6 rounded-t-2xl">
            <h1 className="text-pink-600 font-bold text-2xl">
              🎀My Cute Tasks🎀
            </h1>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-grow space-y-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a cute task..."
                  className="w-full bg-pink-50 border-2 border-pink-200 rounded-2xl px-5 py-4 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-pink-50 border-2 border-pink-200 rounded-2xl px-5 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <button
                onClick={addTask}
                className="bg-pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-pink-500 transition-colors flex-shrink-0 mt-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3 pr-2">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => openModal(task)}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-transform hover:scale-105 ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-pink-50 border-pink-200"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <button
                      onClick={(e) => toggleTask(task.id, e)}
                      className={`w-6 h-6 rounded-md border-2 flex-shrink-0 ${
                        task.completed
                          ? "bg-green-400 border-green-400"
                          : "border-pink-400"
                      } flex items-center justify-center`}
                    >
                      {task.completed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`text-gray-700 truncate ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-sm bg-pink-200 text-pink-600 px-2 py-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{task.dueDate}</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => deleteTask(task.id, e)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 mt-4 pb-4">
            <div className="w-full bg-pink-100 rounded-full h-2.5 mb-2">
              <div
                className="bg-pink-400 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-center text-pink-500 font-medium">
              {tasks.length > 0
                ? `${Math.round((completedTasks / tasks.length) * 100)}%`
                : "0%"}{" "}
              Completed
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTask && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-pink-100 bg-opacity-75 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-1/2 p-6 animate-scale-in"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedTask.text}
            </h2>
            <textarea
              value={detailText}
              onChange={(e) => setDetailText(e.target.value)}
              placeholder="Enter details..."
              className="w-full h-40 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSaveDetails}
                className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
