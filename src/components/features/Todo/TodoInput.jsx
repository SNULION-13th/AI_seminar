import React, { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const TodoInput = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddClick = () => {
    if (inputValue.trim()) {
      addTodo(inputValue, deadline);
      setInputValue('');
      setDeadline('');
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="새로운 할 일 추가..."
          className="rounded-r-none"
        />
        <Button onClick={handleAddClick} className="rounded-l-none">
          추가
        </Button>
      </div>
      <label htmlFor="deadline-input" className="text-sm text-gray-500 mt-2">마감 시간 (YYYY-MM-DDTHH:MM)</label>
      <Input
        id="deadline-input"
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default TodoInput;
