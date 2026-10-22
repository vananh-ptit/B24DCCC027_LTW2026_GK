import React from 'react';
import { LETTERS } from '../data';

export const AudienceChart = ({ chartData }) => {
  if (!chartData) return null;

  return (
    <div style={{ margin: '15px 0', padding: '10px', background: '#f9f9f9', border: '1px solid #ddd' }}>
      <h4>Ý kiến khán giả trường quay:</h4>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '120px' }}>
        {chartData.map((percentage, index) => (
          <div key={index} style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '12px', marginBottom: '5px' }}>{percentage}%</span>
            <div style={{
              width: '40px',
              height: `${percentage}%`,
              backgroundColor: '#3f51b5',
              transition: 'height 0.5s'
            }}></div>
            <span style={{ fontWeight: 'bold', marginTop: '5px' }}>{LETTERS[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};