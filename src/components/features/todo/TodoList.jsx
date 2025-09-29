

import TodoItem from "./TodoItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TodoList = ({ todos, toggleTodo, deleteTodo, mit, setAsMit }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center p-8">
        <svg
          className="mx-auto h-24 w-24 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-800">
          할 일이 없습니다.
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          새로운 할 일을 추가해보세요!
        </p>
      </div>
    );
  }

  return (
    <SortableContext items={todos} strategy={verticalListSortingStrategy}>
      <ul className="divide-y divide-white/30">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            isMit={mit === todo.id}
            setAsMit={setAsMit}
          />
        ))}
      </ul>
    </SortableContext>
  );
};

export default TodoList;
