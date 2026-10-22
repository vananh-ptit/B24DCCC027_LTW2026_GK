import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

export const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <h3>Không tìm thấy câu hỏi</h3>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Câu hỏi số {question.id} ({LEVELS[question.level]})</h3>
      <p style={{ fontWeight: 'bold' }}>{question.question}</p>
      <ul>
        {question.options.map((opt, index) => {
          const isCorrect = index === question.answer;
          return (
            <li
              key={index}
              style={{
                backgroundColor: isCorrect ? 'green' : 'transparent',
                color: isCorrect ? 'white' : 'black',
                padding: '5px',
                margin: '5px 0'
              }}
            >
              {LETTERS[index]}. {opt} {isCorrect && '(Đáp án đúng)'}
            </li>
          );
        })}
      </ul>
      <button onClick={() => navigate(-1)} style={{ marginTop: '15px' }}>Quay lại</button>
    </div>
  );
};