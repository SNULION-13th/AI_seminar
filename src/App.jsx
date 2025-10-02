import { useState, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import PlanView from './components/PlanView';

function App() {
  // State to track the current month and year being displayed
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State for the user-selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // State for storing plans, loaded from localStorage
  const [plans, setPlans] = useState(() => {
    const savedPlans = localStorage.getItem('calenotePlans');
    return savedPlans ? JSON.parse(savedPlans) : {};
  });

  // Effect to save plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calenotePlans', JSON.stringify(plans));
  }, [plans]);

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddPlan = (text) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const newPlan = { id: Date.now(), text };
    
    setPlans(prevPlans => {
      const dayPlans = prevPlans[dateKey] || [];
      return {
        ...prevPlans,
        [dateKey]: [...dayPlans, newPlan]
      };
    });
  };

  const handleDeletePlan = (planId) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setPlans(prevPlans => {
      const dayPlans = prevPlans[dateKey] || [];
      const updatedDayPlans = dayPlans.filter(plan => plan.id !== planId);
      
      const newPlans = { ...prevPlans };
      if (updatedDayPlans.length > 0) {
        newPlans[dateKey] = updatedDayPlans;
      } else {
        delete newPlans[dateKey];
      }
      return newPlans;
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Calenote</h1>
          <p className="text-gray-500">당신의 일상을 담는 미니멀 달력</p>
        </header>

        <main className="flex flex-col md:flex-row gap-8">
          {/* Left Pane: Calendar */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
            <CalendarHeader 
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <CalendarGrid 
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              plans={plans}
            />
          </div>

          {/* Right Pane: Plan View */}
          <div className="w-full md:w-1/3">
            <PlanView 
              selectedDate={selectedDate}
              plans={plans}
              onAddPlan={handleAddPlan}
              onDeletePlan={handleDeletePlan}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
