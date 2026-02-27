// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ALL_UNITS_DATA } from '../data/unitsData';
import '../css/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, setUser, calculateAverage, calculateTotalScore, progress } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header compact-header">
        <Link to="/dashboard" style={{ textDecoration: 'none' }} onClick={() => window.innerWidth < 768 && toggleSidebar()}>
          <h3>生產旅途</h3>
        </Link>
      </div>

      {/* 瘦身後的個人資料區：頭貼直接變名字，底下只顯示總分 */}
      <Link to="/dashboard" className="user-profile-link" onClick={() => window.innerWidth < 768 && toggleSidebar()}>
        <div className="user-profile compact-profile">
          <div className="avatar-name">{user?.username || '學生'}</div>
          <p className="score-badge">總分: <strong>{calculateTotalScore()}</strong> 分</p>
        </div>
      </Link>

      {/* 單元清單區：這裡可以上下滑動 */}
      <nav className="nav-menu">
        <ul>
          {ALL_UNITS_DATA.map((unit) => (
            <li key={unit.id}>
              <Link
                to={`/unit/${unit.id}`}
                className={location.pathname === `/unit/${unit.id}` ? 'active' : ''}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                {unit.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 英雄榜 */}
      <div className="sidebar-footer">
        <Link to="/leaderboard" className="leaderboard-btn-fixed" onClick={() => window.innerWidth < 768 && toggleSidebar()}>
          🏆 班級英雄榜
        </Link>
        <button onClick={handleLogout} className="logout-btn">登出系統</button>
      </div>
    </aside>
  );
};

export default Sidebar;