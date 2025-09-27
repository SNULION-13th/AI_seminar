const TodoFilter = ({ filter, setFilter }) => {
  const filters = [
    { name: "전체", value: "all" },
    { name: "진행 중", value: "active" },
    { name: "완료", value: "completed" },
  ];

  return (
    <div className="flex space-x-4">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`text-sm transition-colors duration-200 ${
            filter === f.value
              ? "font-bold text-pink-500"
              : "text-slate-400 hover:text-slate-600"
          }`}
          onClick={() => setFilter(f.value)}
        >
          {f.name}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;