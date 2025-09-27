
import { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="w-[448px] bg-white rounded-lg shadow-lg pt-5 px-4 pb-5">
      <h1 className="text-xl font-bold text-center mb-6">초간단 할 일 목록</h1>
      <div className="flex mb-6">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="할 일을 입력하세요"
        />
        <Button onClick={addTodo}>추가</Button>
      </div>
      <div>
        {todos.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-sm">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
          </div>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg mb-2"
              >
                <span>{todo}</span>
                <button
                  className="text-red-500 hover:text-red-700 font-semibold"
                  onClick={() => deleteTodo(index)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;
