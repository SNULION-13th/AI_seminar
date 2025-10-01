import { useState } from 'react';
import MenuIcon from '../../assets/images/menu-icon.svg';
import DragIcon from '../../assets/images/drag-icon.svg';
import CheckmarkIcon from '../../assets/images/checkmark-icon.svg';
import PlusIcon from '../../assets/images/plus-icon.svg';
import InfoIcon from '../../assets/images/info-icon.svg';

const TodoList = ({ onNavigate }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: '오늘의 할 일을 추가해보세요', completed: false },
    { id: 2, text: '완료된 일은 체크하세요', completed: true },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTask = () => {
    const newId = Date.now();
    const newTodos = [...todos, { id: newId, text: '', completed: false }];
    setTodos(newTodos);
    setEditingId(newId);
    setEditText('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStartEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdateTodo = () => {
    if (editText.trim() === '' && todos.find(t => t.id === editingId)) {
      handleDeleteTodo(editingId);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText } : todo
        )
      );
    }
    setEditingId(null);
    setEditText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateTodo();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditText('');
      if (todos.find(t => t.id === editingId)?.text === '') {
        handleDeleteTodo(editingId);
      }
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="w-[512px] bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Flow
        </h1>
        <div>
          <button onClick={() => onNavigate('focus')} className="text-sm font-semibold text-blue-600 mr-4">
            집중 모드
          </button>
          <button>
            <img src={MenuIcon} alt="Menu" className="w-6 h-6 inline-block align-middle" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{completedCount} / {totalCount} 완료</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Todo Items */}
      <div className="py-2">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className={`flex items-center gap-4 px-6 py-4 ${
              index > 0 ? 'border-t border-gray-100' : ''
            }`}
          >
            <button
              onClick={() => handleToggleComplete(todo.id)}
              className={`w-5 h-5 border-2 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'border-transparent bg-gradient-to-br from-blue-500 to-purple-500'
                  : 'border-gray-300'
              }`}
            >
              {todo.completed && <img src={CheckmarkIcon} alt="Checked" className="w-3 h-3" />}
            </button>
            
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleUpdateTodo}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-grow bg-gray-100 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span
                onClick={() => handleStartEditing(todo)}
                className={`flex-grow cursor-pointer ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {todo.text}
              </span>
            )}

            <button onClick={() => handleDeleteTodo(todo.id)} className="text-gray-400 hover:text-red-500 font-bold px-2">
                X
            </button>
            <button className="cursor-move">
              <img src={DragIcon} alt="Drag handle" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      {/* Add Task Button */}
      <button
        onClick={handleAddTask}
        className="flex items-center gap-3 w-full text-left bg-gray-50 hover:bg-gray-100 px-6 py-4"
      >
        <img src={PlusIcon} alt="Add task" className="w-4 h-4" />
        <span className="text-gray-600 font-medium">빠르게 할 일 추가하기</span>
      </button>

      {/* Footer Banner */}
      <div className="flex items-center gap-4 bg-blue-50 px-6 py-3 mt-1">
          <img src={InfoIcon} alt="Info" className="w-5 h-5" />
          <p className="text-sm text-blue-800">
            오늘 <span className="font-bold">{completedCount}개</span>의 할 일을 완료했어요! 잘 하고 있어요.
          </p>
      </div>
    </div>
  );
};

export default TodoList;
