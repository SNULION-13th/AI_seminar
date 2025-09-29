
const TodoInput = ({ todo, setTodo, addTodo }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="p-6">
      <div className="relative">
        <input
          type="text"
          placeholder="오늘 무엇을 할까요?"
          className="w-full bg-transparent border-b-2 border-slate-400/50 py-2 text-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-colors"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {todo && (
          <button
            onClick={addTodo}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoInput;
