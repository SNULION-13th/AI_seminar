import { useState } from 'react';
import './App.css';
import TodoList from './components/features/TodoList';
import AddTodoForm from './components/features/AddTodoForm';
import MagicPatternsCommunity from './components/features/MagicPatternsCommunity';


function App() {
  const [currentView, setCurrentView] = useState('patterns'); // 'todos' or 'patterns'
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: true },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">My App</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('patterns')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'patterns'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Magic Patterns
              </button>
              <button
                onClick={() => setCurrentView('todos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'todos'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todo App
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'patterns' ? (
        <MagicPatternsCommunity />
      ) : (
        <div className="bg-gray-100">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-4">
              My Todos
            </h1>
            <div className="bg-white rounded shadow">
              <AddTodoForm addTodo={addTodo} />
              <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;