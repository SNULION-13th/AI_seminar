import { useState, useEffect } from "react";
import closeIcon from "./assets/close-icon.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <header className="bg-indigo-600 text-white text-center py-4 rounded-t-lg">
            <h1 className="text-xl font-bold">Momentum</h1>
          </header>
          <main className="p-6">
            <div className="flex items-center bg-gray-50 rounded-lg border-2 border-indigo-100">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                placeholder="지금 해야 할 일을 입력하세요"
                className="flex-grow p-3 bg-transparent focus:outline-none text-gray-800 placeholder-gray-300"
              />
              <button
                onClick={handleAddTodo}
                className="bg-indigo-600 text-white px-4 py-3 rounded-r-md"
              >
                추가
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800">
                해야 할 일
              </h2>
              <ul className="mt-4 space-y-3">
                {activeTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => handleToggleTodo(todo.id)}
                    >
                      {todo.text}
                    </span>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      <img src={closeIcon} alt="Delete" className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {completedTodos.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-500">
                  완료된 일
                </h2>
                <ul className="mt-4 space-y-3">
                  {completedTodos.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                    >
                      <span
                        className="cursor-pointer text-gray-400 line-through"
                        onClick={() => handleToggleTodo(todo.id)}
                      >
                        {todo.text}
                      </span>
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                        <img src={closeIcon} alt="Delete" className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
