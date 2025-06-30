import React from 'react';
import './Table.css';

const Table = ({ data, onCellChange, checkAnswers }) => {
  return (
    <table>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>
                <input
                  type="number"
                  value={cell.value}
                  onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                  className={
                    checkAnswers
                      ? cell.isCorrect
                        ? 'correct'
                        : 'wrong'
                      : ''
                  }
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table; 