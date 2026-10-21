import React from 'react';
import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ expenses, onDelete, onTogglePaid }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Khoản chi</th>
          <th>Số tiền</th>
          <th>Danh mục</th>
          <th>Ngày</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((item) => (
          <ExpenseRow
            key={item.id}
            item={item}
            onDelete={onDelete}
            onTogglePaid={onTogglePaid}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;