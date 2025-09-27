import { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border"
        placeholder="Add a new todo"
      />
      <button type="submit" className="w-full p-2 mt-2 text-white bg-blue-500">Add</button>
    </form>
  );
};

export default AddTodoForm;
