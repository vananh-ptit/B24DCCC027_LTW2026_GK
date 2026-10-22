
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = ({ playerName, setPlayerName }) => {
  const navigate = useNavigate();

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