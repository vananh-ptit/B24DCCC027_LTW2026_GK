import React, { useState } from 'react';
import { formatMoney, LETTERS } from '../data';

export const History = ({ history, onClearHistory }) => {
  const [selectedSession, setSelectedSession] = useState(null);

 
  const sortedHistory = [...history].sort((a, b) => b.prize - a.prize);

  const totalPrize = history.reduce((sum, item) => sum + item.prize, 0);
  const maxPrize = history.length > 0 ? Math.max(...history.map(item => item.prize)) : 0;

  const getReasonText = (reason) => {
    switch (reason) {
      case 'win': return 'Thắng cuộc (15/15)';
      case 'wrong': return 'Trả lời sai';
      case 'timeout': return 'Hết giờ';
      case 'quit': return 'Dừng cuộc chơi';
      default: return reason;
    }
  };

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>
      {history.length === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <div>
          <p><strong>Số lượt chơi:</strong> {history.length}</p>
          <p><strong>Tiền thưởng cao nhất:</strong> {formatMoney(maxPrize)}</p>
          <p><strong>Tổng tiền thưởng:</strong> {formatMoney(totalPrize)}</p>

          <button onClick={onClearHistory} style={{ marginBottom: '15px', padding: '6px 12px', background: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Xóa lịch sử
          </button>

          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th>STT</th>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Tiền thưởng</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.map((item, index) => (
                <tr key={item.id || index} style={{ textAlign: 'center' }}>
                  <td>{index + 1}</td>
                  <td>{item.playerName}</td>
                  <td>{item.correctCount}/15</td>
                  <td>{formatMoney(item.prize)}</td>
                  <td>{item.date}</td>
                  <td>{getReasonText(item.reason)}</td>
                  <td>
                    <button onClick={() => setSelectedSession(item)} style={{ padding: '4px 8px', cursor: 'pointer' }}>
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSession && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3>Chi tiết lượt chơi - {selectedSession.playerName}</h3>
            <p><strong>Thời gian:</strong> {selectedSession.date}</p>
            <p><strong>Tiền thưởng:</strong> {formatMoney(selectedSession.prize)}</p>
            <hr />
            <ol>
              {selectedSession.historyLog?.map((log, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{log.question}</p>
                  <p style={{ margin: 0, color: log.isCorrect ? 'green' : 'red' }}>
                    Chọn: {log.selectedAnswer !== null ? LETTERS[log.selectedAnswer] : 'Không chọn'} 
                    {!log.isCorrect && ` | Đáp án đúng: ${LETTERS[log.correctAnswer]}`}
                  </p>
                </li>
              ))}
            </ol>
            <button onClick={() => setSelectedSession(null)} style={{ marginTop: '10px', padding: '6px 12px' }}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};