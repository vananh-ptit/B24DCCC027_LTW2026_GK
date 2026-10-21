import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseRow = ({ item, onDelete, onTogglePaid }) => {
  const { id, title, amount, category, date, paid } = item;

  return (
    <tr>
      <td>
        <Link to={`/expenses/${id}`}>{title}</Link>
      </td>
      <td>{formatMoney(amount)}</td>
      <td>{category}</td>
      <td>{date}</td>
      <td>
        <span style={{ color: paid ? 'inherit' : 'orange' }}>
          {paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      </td>
      <td>
        <button onClick={() => onTogglePaid(id)}>
          {paid ? 'Đánh dấu chưa trả' : 'Đánh dấu đã trả'}
        </button>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default ExpenseRow;