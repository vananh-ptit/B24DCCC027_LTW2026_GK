import React from 'react';
import { LETTERS } from '../data';

export const AnswerButton = ({ index, option, status, selectedAnswer, correctAnswer, hiddenOptions, onClick }) => {
  const isHidden = hiddenOptions.includes(index);

  let backgroundColor = '#fff';
  if (isHidden) {
    backgroundColor = '#d3d3d3';
  } else if (status === 'locked' && selectedAnswer === index) {
    backgroundColor = 'orange';
  } else if (status === 'revealed') {
    if (index === correctAnswer) {
      backgroundColor = 'green';
    } else if (selectedAnswer === index) {
      backgroundColor = 'red';
    }
  }

  return (
    <button
      onClick={() => !isHidden && status === 'answering' && onClick(index)}
      disabled={isHidden || status !== 'answering'}
      style={{
        padding: '15px',
        margin: '5px',
        backgroundColor,
        color: isHidden ? '#888' : '#000',
        border: '1px solid #ccc',
        cursor: isHidden || status !== 'answering' ? 'not-allowed' : 'pointer',
        textAlign: 'left',
        fontSize: '16px'
      }}
    >
      {LETTERS[index]}. {isHidden ? '' : option}
    </button>
  );
};