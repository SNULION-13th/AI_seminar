import React from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mr-4 h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className="text-gray-400 hover:text-red-500">
        <img src="/src/assets/icons/close-icon.svg" alt="delete" className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TodoItem;
