import React, { useState, useEffect } from 'react';
import { saveScore } from '../services/api';

function Timer({ onReset, correctAnswers }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Effet pour le chronomètre principal
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Effet pour la sauvegarde automatique toutes les 10 secondes
  useEffect(() => {
    let saveIntervalId;
    if (isRunning && time > 0) {
      saveIntervalId = setInterval(async () => {
        try {
          await saveScore({
            correctAnswers,
            time
          });
          console.log('Score auto-saved');
        } catch (error) {
          console.error('Error auto-saving score:', error);
        }
      }, 10000); // 10 secondes
    }
    return () => clearInterval(saveIntervalId);
  }, [isRunning, time, correctAnswers]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = async () => {
    // Sauvegarder le score actuel avant la réinitialisation
    if (time > 0) {
      try {
        await saveScore({
          correctAnswers,
          time
        });
        console.log('Score saved on reset');
      } catch (error) {
        console.error('Error saving score on reset:', error);
      }
    }
    
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