import React, { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const TodoInput = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="p-4 flex">
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
  );
};

export default TodoInput;
