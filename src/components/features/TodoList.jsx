const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id} className={`flex items-center justify-between p-4 ${todo.completed ? 'text-gray-400' : ''}`}>
        <span
          className={todo.completed ? 'line-through' : ''}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </span>
        <button onClick={() => deleteTodo(todo.id)} className="text-red-500">Delete</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
