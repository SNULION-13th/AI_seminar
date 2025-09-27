import React from "react";
import plusIcon from "./assets/plus.svg";
import checkIcon from "./assets/check.svg";
import starIcon from "./assets/star.svg";
import trashIcon from "./assets/trash.svg";

const tasks = [
  // 수정된 코드
  {
    id: 1,
    text: "'오늘의 집중'으로 지정된 가장 중요한 할 일",
    completed: false,
    important: true,
  },
  {
    id: 2,
    text: "오늘 안에 끝내야 할 일반 할 일",
    completed: false,
    important: false,
  },
  { id: 3, text: "이미 완료된 할 일", completed: true, important: false },
  { id: 4, text: "어제 못한 일", completed: false, important: false },
];

function App() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-200 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-indigo-600 text-white p-6">
          <h1 className="text-2xl font-bold text-center">오늘의 할 일</h1>
          <p className="text-sm text-indigo-200 text-center mt-1">
            오늘도 멋진 하루 보내세요!
          </p>
        </header>

        <main className="p-6">
          {/* Task Input */}
          <form className="flex items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="새로운 할 일을 추가하세요..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center hover:bg-indigo-700 transition-colors"
            >
              <img src={plusIcon} alt="Add task" className="w-6 h-6" />
            </button>
          </form>

          {/* Filters */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg">
              전체
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              진행 중
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              완료
            </button>
          </div>

          {/* Task List */}
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all ${
                  task.important
                    ? "bg-yellow-50 border-2 border-yellow-400"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    className={`w-6 h-6 rounded-md flex items-center justify-center border ${
                      task.completed
                        ? "bg-indigo-500 border-indigo-500"
                        : "border-gray-400"
                    }`}
                  >
                    {task.completed && (
                      <img
                        src={checkIcon}
                        alt="Completed"
                        className="w-4 h-4"
                      />
                    )}
                  </button>
                  <p
                    className={`text-base ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-800"
                    } ${task.important ? "font-bold text-indigo-800" : ""}`}
                  >
                    {task.text}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-yellow-500">
                    <img
                      src={starIcon}
                      alt="Mark as important"
                      className={`w-5 h-5 ${
                        task.important ? "text-yellow-500" : ""
                      }`}
                    />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <img
                      src={trashIcon}
                      alt="Delete task"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>

        {/* Footer */}
        <footer className="border-t p-4 flex items-center justify-between text-sm">
          <p className="text-gray-600">
            <span className="font-bold">
              ✨ {tasks.filter((t) => !t.completed).length}개
            </span>
            의 할 일이 남았어요!
          </p>
          <button className="text-gray-500 hover:text-red-600">
            완료된 항목 모두 지우기
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
