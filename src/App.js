import React, { useState, useMemo } from 'react';
import './App.css';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const size = 10;
  const [answers, setAnswers] = useState({});

  const numbers = useMemo(() => {
    const nums = Array.from({ length: size }, (_, i) => i);
    return {
      rows: shuffleArray(nums),
      cols: shuffleArray(nums)
    };
  }, []);

  const handleChange = (rowIndex, colIndex, event) => {
    const value = event.target.value;
    const row = numbers.rows[rowIndex];
    const col = numbers.cols[colIndex];
    setAnswers(prev => ({
      ...prev,
      [`${row}-${col}`]: value,
    }));
  };

  const isCorrect = (rowIndex, colIndex) => {
    const row = numbers.rows[rowIndex];
    const col = numbers.cols[colIndex];
    const key = `${row}-${col}`;
    const val = answers[key];
    return val !== undefined && parseInt(val, 10) === row * col;
  };

  return (
    <div className="container">
      <h1>Table de multiplication</h1>
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