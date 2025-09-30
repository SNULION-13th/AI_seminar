import React, { useState } from 'react';
import Card from '../../ui/Card';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Todo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: '할 일 예시', completed: false, deadline: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    { id: 2, text: '이메일 확인하기', completed: true, deadline: null },
  ]);

  const addTodo = (text, deadline) => {
    const newTodo = { id: Date.now(), text, completed: false, deadline };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo && !todo.completed) {
      try {
        window.default_api.API_post_page({
          database_id: "2269782887b7808e84a1c1594545c74d",
          properties: {
            "이름": {
              "title": [
                {
                  "text": {
                    "content": todo.text
                  }
                }
              ]
            },
            "날짜": {
              "date": {
                "start": new Date().toISOString().split('T')[0]
              }
            }
          }
        });
      } catch (error) {
        console.error("Notion API 호출에 실패했습니다:", error);
      }
    }
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <TodoHeader />
          <TodoInput addTodo={addTodo} />
          <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </Card>
      </div>
    </div>
  );
};

export default Todo;
