import React from 'react';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { formatMoney } from '../data';

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, prize, correctCount, reason } = location.state;

  let message = '';
  if (reason === 'win') message = 'Chúc mừng! Bạn đã trở thành triệu phú';
  else if (reason === 'wrong') message = 'Rất tiếc, bạn đã trả lời sai';
  else if (reason === 'timeout') message = 'Hết giờ!';
  else if (reason === 'quit') message = 'Bạn đã dừng cuộc chơi';

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2>{message}</h2>
      <p><strong>Người chơi:</strong> {playerName}</p>
      <p><strong>Số câu trả lời đúng:</strong> {correctCount}/15</p>
      <p><strong>Tiền thưởng:</strong> {formatMoney(prize)}</p>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => navigate('/play')} style={{ padding: '8px 15px' }}>Chơi lại</button>
        <Link to="/" style={{ padding: '8px 15px', background: '#eee', textDecoration: 'none', color: '#000', border: '1px solid #ccc' }}>Về trang chủ</Link>
      </div>
    </div>
  );
};