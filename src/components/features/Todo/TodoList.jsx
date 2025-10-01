import { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

// MCP Integration (Slack)
const sendSlackNotification = (todo) => {
  // This is a placeholder for Slack integration.
  // In a real application, this would make an API call to Slack.
  console.log(`Sending Slack notification for new todo: ${todo}`);
};

// MCP Integration (Gmail)
const sendGmailSummary = (todo) => {
  // This is a placeholder for Gmail integration.
  // In a real application, this would use the Gmail API to send an email.
  console.log(`Sending Gmail summary for important todo: ${todo}`);
};

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = { text: inputValue, important: false };
      setTodos([...todos, newTodo]);
      setInputValue('');
      // --- MCP Integration: Slack ---
      sendSlackNotification(newTodo.text);
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleImportant = (index) => {
    const newTodos = [...todos];
    newTodos[index].important = !newTodos[index].important;
    setTodos(newTodos);

    if (newTodos[index].important) {
      // --- MCP Integration: Gmail ---
      sendGmailSummary(newTodos[index].text);
    }
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
                className={`flex justify-between items-center p-2 rounded-lg mb-2 ${
                  todo.important ? 'bg-yellow-100' : 'bg-gray-50'
                }`}
              >
                <span>{todo.text}</span>
                <div className="flex items-center">
                  <button
                    className={`text-xs font-semibold mr-2 ${
                      todo.important
                        ? 'text-yellow-600 hover:text-yellow-800'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    onClick={() => toggleImportant(index)}
                  >
                    {todo.important ? '★ 중요' : '☆ 중요'}
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                    onClick={() => deleteTodo(index)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;