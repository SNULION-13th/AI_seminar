
import TodoFilter from "../features/todo/TodoFilter";

const Footer = ({ todos, filter, setFilter }) => {
  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="p-6 bg-transparent border-t border-white/30 flex justify-between items-center">
      <p className="text-sm text-slate-500">{remaining}개 남음</p>
      <TodoFilter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default Footer;
