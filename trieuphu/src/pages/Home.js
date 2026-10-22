
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

export const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  
  const bestRecord = history && history.length > 0 
    ? history.reduce((max, item) => (item.prize > max.prize ? item : max), history[0])
    : null;

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Ai là triệu phú - Phiên bản Lập trình Web</h2>
      <p>Luật chơi: Trả lời 15 câu hỏi trắc nghiệm, mỗi câu 30 giây. Có 3 mốc an toàn (câu 5, 10, 15).</p>
      
      {bestRecord && (
        <div style={{ background: '#fff3cd', padding: '10px', marginBottom: '15px', border: '1px solid #ffeeba' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#856404' }}>
            🏆 Kỷ lục: {formatMoney(bestRecord.prize)} – {bestRecord.playerName}
          </p>
        </div>
      )}

      <form onSubmit={handleStart}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nhập tên người chơi: </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Tên của bạn..."
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <button type="submit" disabled={!playerName.trim()} style={{ padding: '8px 15px' }}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};