import React, { useState } from 'react';

const PlanView = ({ selectedDate, plans, onAddPlan, onDeletePlan }) => {
  const [newPlanText, setNewPlanText] = useState('');

  const dateKey = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
  const dayPlans = plans[dateKey] || [];

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (newPlanText.trim()) {
      onAddPlan(newPlanText);
      setNewPlanText('');
    }
  };

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(selectedDate);

  return (
    <div className="bg-white p-6 rounded-lg shadow h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{formattedDate}</h3>
      
      {/* Add Plan Form */}
      <form onSubmit={handleAddPlan} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newPlanText}
          onChange={(e) => setNewPlanText(e.target.value)}
          placeholder="일정 추가하기..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-semibold"
        >
          추가
        </button>
      </form>

      {/* Plan List */}
      <div className="space-y-3">
        {dayPlans.length > 0 ? (
          dayPlans.map((plan) => (
            <div key={plan.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <p className="text-gray-700">{plan.text}</p>
              <button 
                onClick={() => onDeletePlan(plan.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete plan"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 pt-8">
            <p>일정이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanView;
