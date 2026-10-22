import React from 'react';

export const Timer = ({ timeLeft }) => {
  return (
    <div style={{ fontSize: '20px', fontWeight: 'bold', color: timeLeft <= 10 ? 'red' : 'black', margin: '15px 0' }}>
      Còn {timeLeft} giây
    </div>
  );
};