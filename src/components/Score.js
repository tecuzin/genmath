import React from 'react';

function Score({ correctAnswers }) {
  return (
    <div className="score">
      <span className="score-value">✓ {correctAnswers}</span>
    </div>
  );
}

export default Score; 