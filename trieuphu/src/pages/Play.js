import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { MoneyLadder } from '../components/MoneyLadder';
import { LifeLines } from '../components/LifeLines';
import { TIME_PER_QUESTION } from '../data';
import { calcPrize } from '../utils';

export const Play = ({ playerName, questions }) => {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [status, setStatus] = useState('answering'); // 'answering', 'locked', 'revealed'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

 
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);

  const currentQ = questions[currentQuestionIndex];

  useEffect(() => {
    if (!playerName) {
      navigate('/', { replace: true });
    }
  }, [playerName, navigate]);

  
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
      endGame(currentQuestionIndex, 'timeout', selectedAnswer);
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
      
      
      const logItem = {
        questionId: currentQ.id,
        question: currentQ.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: currentQ.answer,
        isCorrect: isCorrect
      };

      const newHistoryLog = [...historyLog, logItem];
      setHistoryLog(newHistoryLog);

      const t2 = setTimeout(() => {
        if (isCorrect) {
          if (currentQuestionIndex === questions.length - 1) {
            endGame(15, 'win', selectedAnswer, newHistoryLog);
          } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setHiddenOptions([]);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          endGame(currentQuestionIndex, 'wrong', selectedAnswer, newHistoryLog);
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

  
  const handleFiftyFifty = () => {
    if (usedFiftyFifty || status !== 'answering' || !currentQ) return;

    const wrongIndexes = [0, 1, 2, 3].filter(idx => idx !== currentQ.answer);
    
    const shuffledWrong = wrongIndexes.sort(() => 0.5 - Math.random());
    const toHide = shuffledWrong.slice(0, 2);

    setHiddenOptions(toHide);
    setUsedFiftyFifty(true);
  };

  
  const handleQuit = () => {
    if (status !== 'answering') return;
    endGame(currentQuestionIndex, 'quit', null, historyLog);
  };

  
  const endGame = (correctCount, reason, lastSelected, currentLogs = historyLog) => {
    const prize = calcPrize(correctCount, reason);
    const dateStr = new Date().toLocaleString('vi-VN');

    const gameSession = {
      id: Date.now(),
      playerName,
      date: dateStr,
      correctCount,
      prize,
      reason,
      historyLog: currentLogs
    };

    
    const existingHistory = JSON.parse(localStorage.getItem('history') || '[]');
    const updatedHistory = [gameSession, ...existingHistory];
    localStorage.setItem('history', JSON.stringify(updatedHistory));

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
        
        <LifeLines
          usedFiftyFifty={usedFiftyFifty}
          usedQuit={false}
          status={status}
          onFiftyFifty={handleFiftyFifty}
          onQuit={handleQuit}
        />

        <QuestionCard
          currentQuestionIndex={currentQuestionIndex}
          questionData={currentQ}
          status={status}
          selectedAnswer={selectedAnswer}
          hiddenOptions={hiddenOptions}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>
      <div>
        <MoneyLadder currentQuestionIndex={currentQuestionIndex} />
      </div>
    </div>
  );
};