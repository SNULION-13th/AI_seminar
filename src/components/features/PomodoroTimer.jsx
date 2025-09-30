
import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // Constants for the SVG circle
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const totalDuration = (isBreak ? 5 : 25) * 60;
  const timeRemaining = minutes * 60 + seconds;
  const progress = ((totalDuration - timeRemaining) / totalDuration) * circumference;
  const strokeDashoffset = circumference - progress;


  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer ends, switch between break and focus
            const newIsBreak = !isBreak;
            setIsBreak(newIsBreak);
            setMinutes(newIsBreak ? 5 : 25);
            setIsActive(false); // Pause timer on switch
            // Optional: Add a sound or notification here
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const time = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-6 transition-colors duration-500">
      <div className="relative w-52 h-52 mx-auto mb-4">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Background Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth="12"
            className="stroke-gray-300 dark:stroke-gray-600"
          />
          {/* Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth="12"
            className="stroke-blue-500"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="text-4xl font-bold fill-current text-gray-900 dark:text-white"
          >
            {time}
          </text>
        </svg>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-4">
        {isBreak ? 'Break Time!' : 'Focus Time'}
      </p>
    </div>
  );
};

export default PomodoroTimer;
