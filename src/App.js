import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    axios.get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
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

  const handleAdd = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTogglePaid = (id) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, paid: !item.paid } : item))
    );
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onDelete={handleDelete}
              onTogglePaid={handleTogglePaid}
            />
          }
        />
        <Route
          path="expenses/new"
          element={<AddExpense expenses={expenses} onAdd={handleAdd} />}
        />
        <Route
          path="expenses/:id"
          element={<ExpenseDetail expenses={expenses} />}
        />
      </Route>
    </Routes>
  );
};

export default App;