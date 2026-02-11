// src/components/Layout.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Login from './Login'; // 假設 Login 放在 components 資料夾
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 切換側邊欄顯示狀態 (手機版用)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 如果沒有登入，直接顯示登入頁面，不顯示 Layout
  if (!user) {
    return <Login />;
  }

  return (
    <div className="layout-container">
      {/* 1. 遮罩層 (Overlay): 手機版側邊欄打開時，點擊背景可關閉 */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* 2. 側邊欄 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 3. 主要內容區 */}
      <div className="main-content">
        <header className="mobile-header">
          {/* 漢堡按鈕 (只有手機版會顯示) */}
          <button className="hamburger-btn" onClick={toggleSidebar}>
            ☰ 選單
          </button>
          <span>學習平台</span>
        </header>

        <div className="content-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;