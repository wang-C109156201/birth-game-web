// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, setUser, calculateAverage, progress } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  // 定義單元清單
  const units = [
    { id: 1, name: '單元 1: 基礎認知' },
    { id: 2, name: '單元 2: 進階應用' },
    { id: 3, name: '單元 3: 實作練習' },
    { id: 4, name: '單元 4: 綜合測驗' },
    { id: 5, name: '單元 5: 期末考核' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* 👉 紅線區域 1：學習系統標題 (加上 Link) */}
      <div className="sidebar-header">
        <Link to="/dashboard" style={{ textDecoration: 'none' }} onClick={() => window.innerWidth < 768 && toggleSidebar()}>
          <h3>學習系統</h3>
        </Link>
      </div>

      {/* 👉 紅線區域 2：學生個人資料 (加上 Link 並改為 button 樣式的區塊) */}
      <Link to="/dashboard" className="user-profile-link" onClick={() => window.innerWidth < 768 && toggleSidebar()}>
        <div className="user-profile">
          <div className="avatar">學生</div>
          <p><strong>{user?.username || '訪客'}</strong></p>
          <p className="score-badge">平均分數: {calculateAverage()}</p>
        </div>
      </Link>

      <nav className="nav-menu">
        <ul>
          {units.map((unit) => (
            <li key={unit.id}>
              <Link 
                to={`/unit/${unit.id}`} 
                className={location.pathname === `/unit/${unit.id}` ? 'active' : ''}
                onClick={() => window.innerWidth < 768 && toggleSidebar()} // 手機點擊後自動收合
              >
                {unit.name}
              </Link>
            </li>
          ))}

          {/* 英雄榜 */}
          <li style={{ marginTop: '15px' }}>
            <Link 
              to="/leaderboard" 
              className={location.pathname === '/leaderboard' ? 'active' : ''}
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
              style={{ backgroundColor: '#FFFBEB', color: '#D97706', borderLeftColor: '#F59E0B' }}
            >
              🏆 班級英雄榜
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        {user?.role === 'teacher' && (
             <Link to="/teacher" className="teacher-link">老師後台</Link>
        )}
        <button onClick={handleLogout} className="logout-btn">登出系統</button>
      </div>
    </aside>
  );
};

export default Sidebar;