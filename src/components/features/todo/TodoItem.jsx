import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TodoItem = ({ id, todo, toggleTodo, deleteTodo, isMit, setAsMit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const accentColor = "pink";

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center p-4 border-b border-white/30 group transition-all duration-300 ${
        todo.is_completed ? "opacity-50" : ""
      } ${
        isMit
          ? `border-l-4 border-${accentColor}-500 bg-${accentColor}-500/10`
          : ""
      }`}
    >
      <div {...attributes} {...listeners} className="p-2 cursor-grab touch-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex items-center flex-grow">
        <div
          onClick={() => toggleTodo(todo.id)}
          className={`w-6 h-6 flex items-center justify-center border-2 border-slate-400/80 rounded-full cursor-pointer transition-all duration-300 group-hover:border-${accentColor}-500`}
        >
          {todo.is_completed && (
            <div className={`w-4 h-4 bg-${accentColor}-500 rounded-full`}></div>
          )}
        </div>
        <span
          className={`ml-4 text-lg text-slate-900 ${
            todo.is_completed ? "line-through" : ""
          } ${isMit ? "font-semibold" : ""}`}
        >
          {todo.task}
        </span>
      </div>
      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setAsMit(todo.id)}
          className="text-slate-400 hover:text-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill={isMit ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={isMit ? 0 : 1.5}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-slate-400 hover:text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;