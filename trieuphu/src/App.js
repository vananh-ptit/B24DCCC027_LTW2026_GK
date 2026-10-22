import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { QuestionBank } from './pages/QuestionBank';
import { QuestionDetail } from './pages/QuestionDetail';
import { NotFound } from './pages/NotFound';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tải dữ liệu câu hỏi bằng axios kết hợp AbortController trong hàm cleanup
  useEffect(() => {
    const controller = new AbortController();
    axios.get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Đang tải câu hỏi...</div>;
  if (error) return <div style={{ padding: '20px' }}>Không tải được câu hỏi.</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="questions" element={<QuestionBank questions={questions} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;