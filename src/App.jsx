import React from 'react';
import Header from './components/Header';
import TodayFocus from './components/TodayFocus';
import CategoryFilters from './components/CategoryFilters';
import TodoList from './components/TodoList';
import AddTaskButton from './components/AddTaskButton';
import BottomNav from './components/BottomNav';

function App() {
  const todoTasks = [
    {
      title: '주간 회의 준비',
      category: '#업무',
      categoryColor: 'bg-blue-100 text-blue-600',
      isCompleted: false,
    },
    {
      title: '헬스장 가기',
      category: '#운동',
      categoryColor: 'bg-green-100 text-green-600',
      isCompleted: false,
    },
  ];

  const completedTasks = [
    {
      title: '책 읽기',
      category: '#자기계발',
      categoryColor: 'bg-purple-100 text-purple-600',
      isCompleted: true,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="relative max-w-md mx-auto bg-white pb-20">
        <Header />
        <main>
          <TodayFocus />
          <CategoryFilters />
          <TodoList title="할 일" tasks={todoTasks} />
          <TodoList title="완료된 할 일" tasks={completedTasks} />
        </main>
        <AddTaskButton />
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
