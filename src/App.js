import React, { useState, useMemo } from 'react';
import './App.css';
import Timer from './components/Timer';
import Score from './components/Score';
import { config } from './config';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const numbers = useMemo(() => {
    return {
      rows: shuffleArray(Array.from({ length: config.rowSize }, (_, i) => i)),
      cols: shuffleArray(Array.from({ length: config.columnSize }, (_, i) => i))
    };
  }, []);

  const handleChange = (rowIndex, colIndex, event) => {
    const value = event.target.value;
    const row = numbers.rows[rowIndex];
    const col = numbers.cols[colIndex];
    const key = `${row}-${col}`;
    const previousAnswer = answers[key];
    const wasCorrect = previousAnswer !== undefined && parseInt(previousAnswer, 10) === row * col;
    const isNowCorrect = value !== '' && parseInt(value, 10) === row * col;

    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));

    if (!wasCorrect && isNowCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else if (wasCorrect && !isNowCorrect) {
      setCorrectAnswers(prev => prev - 1);
    }
  };

  const isCorrect = (rowIndex, colIndex) => {
    const row = numbers.rows[rowIndex];
    const col = numbers.cols[colIndex];
    const key = `${row}-${col}`;
    const val = answers[key];
    return val !== undefined && parseInt(val, 10) === row * col;
  };

  const handleReset = () => {
    setAnswers({});
    setCorrectAnswers(0);
  };

  return (
    <div className="container">
      <div className="header">
        <Timer onReset={handleReset} />
        <div className="title-container">
          <h1>Table de multiplication</h1>
          <Score correctAnswers={correctAnswers} />

        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {numbers.cols.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {numbers.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>{row}</th>
              {numbers.cols.map((col, colIndex) => {
                const key = `${row}-${col}`;
                const answer = answers[key] || '';
                const correct = isCorrect(rowIndex, colIndex);
                const show = answer !== '';
                return (
                  <td key={colIndex}>
                    <input
                      type="number"
                      value={answer}
                      onChange={e => handleChange(rowIndex, colIndex, e)}
                      className={show ? (correct ? 'correct' : 'wrong') : ''}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
