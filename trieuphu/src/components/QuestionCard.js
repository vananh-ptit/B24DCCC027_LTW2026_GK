import React from 'react';
import { AnswerButton } from './AnswerButton';

export const QuestionCard = ({ currentQuestionIndex, questionData, status, selectedAnswer, hiddenOptions, onSelectAnswer }) => {
  if (!questionData) return null;

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
      <h3>Câu hỏi {currentQuestionIndex + 1}/15</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{questionData.question}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {questionData.options.map((option, index) => (
          <AnswerButton
            key={index}
            index={index}
            option={option}
            status={status}
            selectedAnswer={selectedAnswer}
            correctAnswer={questionData.answer}
            hiddenOptions={hiddenOptions}
            onClick={onSelectAnswer}
          />
        ))}
      </div>
    </div>
  );
};