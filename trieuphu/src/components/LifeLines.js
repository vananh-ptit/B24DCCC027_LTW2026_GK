import React from 'react';

export const LifeLines = ({ 
  usedFiftyFifty, usedAudience, usedQuit, status, 
  onFiftyFifty, onAudience, onQuit 
}) => {
  return (
    <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
      <button
        onClick={onFiftyFifty}
        disabled={usedFiftyFifty || status !== 'answering'}
        style={{
          padding: '8px 12px',
          backgroundColor: usedFiftyFifty ? '#ccc' : '#2196F3',
          color: '#fff', border: 'none', borderRadius: '4px', cursor: usedFiftyFifty ? 'not-allowed' : 'pointer'
        }}
      >
        50:50 {usedFiftyFifty && '(Đã dùng)'}
      </button>

      <button
        onClick={onAudience}
        disabled={usedAudience || status !== 'answering'}
        style={{
          padding: '8px 12px',
          backgroundColor: usedAudience ? '#ccc' : '#9c27b0',
          color: '#fff', border: 'none', borderRadius: '4px', cursor: usedAudience ? 'not-allowed' : 'pointer'
        }}
      >
        Hỏi khán giả {usedAudience && '(Đã dùng)'}
      </button>

      <button
        onClick={onQuit}
        disabled={usedQuit || status !== 'answering'}
        style={{
          padding: '8px 12px',
          backgroundColor: '#f44336',
          color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'
        }}
      >
        Dừng cuộc chơi
      </button>
    </div>
  );
};