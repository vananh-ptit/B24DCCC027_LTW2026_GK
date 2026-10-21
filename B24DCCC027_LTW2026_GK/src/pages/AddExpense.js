import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ expenses, onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      setError('Vui lòng nhập đầy đủ thông tin phía dưới form');
      return;
    }

    const maxId = expenses.length > 0 ? Math.max(...expenses.map((item) => item.id)) : 0;
    const newExpense = {
      id: maxId + 1,
      title,
      amount: Number(amount),
      category,
      date,
      paid: false,
    };

    onAdd(newExpense);
    navigate('/expenses', { replace: true });
  };

  return (
    <div>
      <h1>Thêm mới khoản chi</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Tên khoản chi</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Số tiền</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Ngày chi</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddExpense;