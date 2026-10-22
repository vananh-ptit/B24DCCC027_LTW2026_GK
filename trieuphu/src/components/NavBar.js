import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const activeStyle = { color: 'red', fontWeight: 'bold' };

  return (
    <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
      <NavLink 
        to="/" 
        end 
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          marginRight: '15px'
        })}
      >
        Trang chủ
      </NavLink>
      <NavLink 
        to="/questions" 
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          marginRight: '15px'
        })}
      >
        Ngân hàng câu hỏi
      </NavLink>
      <NavLink 
        to="/history" 
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        Lịch sử
      </NavLink>
    </nav>
  );
};