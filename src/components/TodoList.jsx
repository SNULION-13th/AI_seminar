import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ title, tasks }) => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-sm font-medium text-slate-500 mb-2">{title}</h2>
      <div>
        {tasks.map((task, index) => (
          <TodoItem
            key={index}
            title={task.title}
            category={task.category}
            categoryColor={task.categoryColor}
            isCompleted={task.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
