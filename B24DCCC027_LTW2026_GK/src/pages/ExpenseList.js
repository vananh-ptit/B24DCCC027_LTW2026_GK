import React from 'react';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onDelete, onTogglePaid }) => {
  return (
    <div>
      <h1>Danh sách khoản chi</h1>
      <ExpenseTable
        expenses={expenses}
        onDelete={onDelete}
        onTogglePaid={onTogglePaid}
      />
    </div>
  );
};

export default ExpenseList;