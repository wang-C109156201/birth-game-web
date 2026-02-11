// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, setUser, calculateAverage } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    // 這裡不需要 navigate，因為 Layout 會偵測 user 為 null 自動切回 Login
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
      <div className="sidebar-header">
        <h3>學習系統</h3>
        {/* 手機版關閉按鈕 */}
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
      </div>

      <div className="user-profile">
        <div className="avatar">學生</div>
        <p><strong>{user?.username || '訪客'}</strong></p>
        <p className="score-badge">平均分數: {calculateAverage()}</p>
      </div>

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