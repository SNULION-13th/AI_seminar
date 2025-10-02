import React, { useState } from 'react';
import Header from '../components/layouts/Header';
import BottomNav from '../components/layouts/BottomNav';
import RoutineItem from '../components/features/RoutineItem';
import FloatingActionButton from '../components/features/FloatingActionButton';
import AddRoutineModal from '../components/features/AddRoutineModal';
import useTime from '../hooks/useTime';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getRemainingTime } = useTime();
  const [routines, setRoutines] = useState([
    { name: '물 마시기', days: ['월', '화', '수', '목', '금', '토', '일'], completed: true },
    { name: '독서 30분', days: ['월', '수', '금'], completed: true },
    { name: '운동하기', days: ['월', '화', '수', '목', '금'], completed: false },
    { name: '일기 쓰기', days: ['월', '화', '수', '목', '금', '토', '일'], completed: false },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addRoutine = (newRoutine) => {
    setRoutines([...routines, { ...newRoutine, completed: false }]);
  };

  const toggleRoutine = (index) => {
    const newRoutines = [...routines];
    newRoutines[index].completed = !newRoutines[index].completed;
    setRoutines(newRoutines);
  };

  const achievement = routines.length > 0 ? (routines.filter(r => r.completed).length / routines.length) * 100 : 0;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="p-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">오늘의 루틴</h2>
            <span className="text-sm text-gray-500">10월 3일 금요일</span>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">오늘의 달성률</span>
              <span className="text-lg font-bold text-blue-500">{achievement.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${achievement}%` }}></div>
            </div>
          </div>

          <div className="space-y-3">
            {routines.map((routine, index) => (
              <RoutineItem
                key={index}
                {...routine}
                remainingTime={getRemainingTime()}
                onToggle={() => toggleRoutine(index)}
              />
            ))}
          </div>
        </div>
      </main>
      <FloatingActionButton onClick={openModal} />
      <BottomNav />
      <AddRoutineModal isOpen={isModalOpen} onClose={closeModal} onAdd={addRoutine} />
    </div>
  );
};

export default MainPage;
