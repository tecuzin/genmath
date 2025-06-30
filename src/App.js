import React, { useState } from 'react';
import './App.css';

function App() {
  const size = 10;
  const [answers, setAnswers] = useState({});

  const handleChange = (row, col, event) => {
    const value = event.target.value;
    setAnswers(prev => ({
      ...prev,
      [`${row}-${col}`]: value,
    }));
  };

  const isCorrect = (row, col) => {
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
            {Array.from({ length: size }, (_, col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: size }, (_, row) => (
            <tr key={row}>
              <th>{row}</th>
              {Array.from({ length: size }, (_, col) => {
                const key = `${row}-${col}`;
                const answer = answers[key] || '';
                const correct = isCorrect(row, col);
                const show = answer !== '';
                return (
                  <td key={col}>
                    <input
                      type="number"
                      value={answer}
                      onChange={e => handleChange(row, col, e)}
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