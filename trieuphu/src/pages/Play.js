import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { MoneyLadder } from '../components/MoneyLadder';
import { TIME_PER_QUESTION } from '../data';
import { calcPrize } from '../utils';

export const Play = ({ playerName, questions }) => {
  const navigate = useNavigate();

  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [status, setStatus] = useState('answering'); // 'answering', 'locked', 'revealed'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const currentQ = questions[currentQuestionIndex];

  
  useEffect(() => {
    if (!playerName) {
      navigate('/', { replace: true });
    }
  }, [playerName, navigate]);

  // Đồng hồ đếm ngược 30 giây
  useEffect(() => {
    if (status !== 'answering' || !playerName) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [status, currentQuestionIndex, playerName]);

  const handleTimeOut = () => {
    setStatus('revealed');
    setTimeout(() => {
      endGame(currentQuestionIndex, 'timeout');
    }, 2000);
  };

  
  useEffect(() => {
    if (status === 'locked') {
      const t1 = setTimeout(() => {
        setStatus('revealed');
      }, 1000);
      return () => clearTimeout(t1);
    }

    if (status === 'revealed' && currentQ) {
      const isCorrect = selectedAnswer === currentQ.answer;
      const t2 = setTimeout(() => {
        if (isCorrect) {
          if (currentQuestionIndex === questions.length - 1) {
            endGame(15, 'win');
          } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          endGame(currentQuestionIndex, 'wrong');
        }
      }, 2000);
      return () => clearTimeout(t2);
    }
  }, [status]);

  const handleSelectAnswer = (index) => {
    if (status !== 'answering') return;
    setSelectedAnswer(index);
    setStatus('locked');
  };

  const endGame = (correctCount, reason) => {
    const prize = calcPrize(correctCount, reason);
    navigate('/result', {
      replace: true,
      state: { playerName, prize, correctCount, reason }
    });
  };

  if (!playerName) return null;
  if (!currentQ) return <div>Đang tải câu hỏi...</div>;

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <Timer timeLeft={timeLeft} />
        <QuestionCard
          currentQuestionIndex={currentQuestionIndex}
          questionData={currentQ}
          status={status}
          selectedAnswer={selectedAnswer}
          hiddenOptions={[]}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>
      <div>
        <MoneyLadder currentQuestionIndex={currentQuestionIndex} />
      </div>
    </div>
  );
};