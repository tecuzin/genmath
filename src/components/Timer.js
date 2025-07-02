import React, { useState, useEffect } from 'react';

function Timer({ onReset }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(true);
    onReset();
  };

  return (
    <div className="timer">
      <span className="timer-display">{formatTime(time)}</span>
      <div className="timer-controls">
        <button className="timer-button" onClick={toggleTimer}>
          {isRunning ? '⏸️' : '▶️'}
        </button>
        <button className="timer-button" onClick={resetTimer}>
          🔄
        </button>
      </div>
    </div>
  );
}

export default Timer; 