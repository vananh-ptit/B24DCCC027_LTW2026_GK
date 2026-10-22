import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

export const QuestionBank = ({ questions }) => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc câu hỏi theo mức độ và từ khóa tìm kiếm
  const filteredQuestions = questions.filter((q) => {
    const matchLevel = selectedLevel === 'All' || q.level === Number(selectedLevel);
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
        <div>
          <label>Mức độ: </label>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
            <option value="All">Tất cả</option>
            <option value="1">Dễ</option>
            <option value="2">Trung bình</option>
            <option value="3">Khó</option>
          </select>
        </div>
        <div>
          <label>Tìm kiếm: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nội dung câu hỏi..."
          />
        </div>
      </div>

      <p>Có {filteredQuestions.length} câu hỏi</p>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};