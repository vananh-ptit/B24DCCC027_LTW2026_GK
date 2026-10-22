import React from 'react';
import { PRIZES, formatMoney } from '../data';

export const MoneyLadder = ({ currentQuestionIndex }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '250px', background: '#fafafa' }}>
      <h4>Thang tiền thưởng</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {PRIZES.map((prize, index) => {
          const revIndex = PRIZES.length - 1 - index;
          const isCurrent = revIndex === currentQuestionIndex;
          const isMilestone = [5, 10, 15].includes(revIndex + 1);

          return (
            <li
              key={revIndex}
              style={{
                padding: '4px 8px',
                backgroundColor: isCurrent ? '#ffeb3b' : 'transparent',
                fontWeight: isMilestone ? 'bold' : 'normal',
                color: isCurrent ? '#d32f2f' : '#000'
              }}
            >
              {revIndex + 1}. {formatMoney(prize)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};