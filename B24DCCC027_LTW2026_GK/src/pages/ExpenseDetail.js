import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const expense = expenses.find((item) => item.id === Number(id));

  if (!expense) {
    return (
      <div>
        <p>Không tìm thấy khoản chi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const { title, amount, category, date, paid } = expense;

  return (
    <div>
      <h1>Chi tiết khoản chi</h1>
      <p>Tên khoản chi: {title}</p>
      <p>Số tiền: {formatMoney(amount)}</p>
      <p>Danh mục: {category}</p>
      <p>Ngày: {date}</p>
      <p>Trạng thái: {paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ExpenseDetail;