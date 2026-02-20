import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useApp } from '../context/AppContext';

const Layout = ({ children }) => {
  const { user } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="layout-container">
      {/* 手機版遮罩層 */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        {/* 手機版專屬 Header */}
        <header className="mobile-header">
          <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>
          <span>互動學習平台</span>
        </header>

        <div className="content-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;