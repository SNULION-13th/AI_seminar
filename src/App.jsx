import { useState } from 'react';
import TodoList from './components/features/TodoList';
import FocusMode from './components/features/FocusMode';
import SignUp from './components/features/SignUp';
import './App.css';

function App() {
  const [view, setView] = useState('signup'); // 'list' or 'focus' or 'signup'

  const navigateTo = (screen) => {
    setView(screen);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {view === 'list' && <TodoList onNavigate={navigateTo} />}
      {view === 'focus' && <FocusMode onNavigate={navigateTo} />}
      {view === 'signup' && <SignUp onNavigate={navigateTo} />}
    </div>
  );
}

export default App;
