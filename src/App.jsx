
import React, { useState, useEffect } from 'react';
import modeToggleIcon from './assets/mode-toggle.svg';
import "./App.css"

function App() {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditingText(todo.text);
  };

  const handleUpdateTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingTodo(null);
    setEditingText('');
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleUpdateTodo(id);
    }
    if (e.key === 'Escape') {
      setEditingTodo(null);
      setEditingText('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true; // 'all'
  });

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg mx-auto p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold text-white">ClearList</h1>
              <p className="text-sm text-gray-400">{dateString}</p>
            </div>
            <button className="bg-gray-700 rounded-full p-2">
              <img src={modeToggleIcon} alt="Mode Toggle" className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAddTodo} className="flex items-center mb-6">
            <input
              type="text"
              placeholder="오늘 무엇을 할까요?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-grow p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          <div className="space-y-2">
            {filteredTodos.length > 0 ? (
              filteredTodos.map(todo => (
                <li key={todo.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg list-none">
                  <div className="flex items-center w-full">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                      className="h-5 w-5 rounded bg-gray-600 border-gray-500 focus:ring-blue-500 text-blue-500"
                    />
                    {editingTodo === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, todo.id)}
                        onBlur={() => handleUpdateTodo(todo.id)}
                        className="ml-3 bg-gray-600 text-white rounded px-2 py-1 w-full"
                        autoFocus
                      />
                    ) : (
                      <span onDoubleClick={() => handleEdit(todo)} className={`ml-3 text-white ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.text}
                      </span>
                    )}
                  </div>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="text-gray-500 hover:text-white ml-4">X</button>
                </li>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                <p>{filter === 'completed' ? '완료된 할 일이 없습니다.' : '할 일을 추가해 보세요!'}</p>
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
              <span>{remainingTodos} items left</span>
              <div className="flex space-x-2">
                <button onClick={() => setFilter('all')} className={`hover:text-white ${filter === 'all' ? 'text-blue-500' : ''}`}>All</button>
                <button onClick={() => setFilter('active')} className={`hover:text-white ${filter === 'active' ? 'text-blue-500' : ''}`}>Active</button>
                <button onClick={() => setFilter('completed')} className={`hover:text-white ${filter === 'completed' ? 'text-blue-500' : ''}`}>Completed</button>
              </div>
              <button onClick={handleClearCompleted} className="hover:text-white">Clear Completed</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
