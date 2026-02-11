import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import QuizUnit from './components/QuizUnit';
import TeacherView from './components/TeacherView';
import './App.css'; // 這裡面寫響應式 CSS

// 模擬資料
const mockImages = [
  { id: 101, content: '圖A' }, { id: 102, content: '圖B' }, 
  { id: 103, content: '圖C' }, { id: 104, content: '圖D' }, { id: 105, content: '圖E' }
];

const Layout = ({ children }) => {
  const { user, calculateAverage } = useApp();
  
  // 響應式 CSS 寫法 (Mobile First)
  // 在電腦版: display: flex (Sidebar 在左, Content 在右)
  // 在手機版: Sidebar 變成漢堡選單或頂部導航
  
  if (!user) return <Login />;

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h3>學習單元</h3>
        <ul>
          <li><Link to="/unit/1">單元 1</Link></li>
          <li><Link to="/unit/2">單元 2</Link></li>
          <li><Link to="/unit/3">單元 3</Link></li>
          <li><Link to="/unit/4">單元 4</Link></li>
          <li><Link to="/unit/5">單元 5</Link></li>
        </ul>
        <div className="user-info">
          <p>使用者: {user.username}</p>
          <p>目前總平均: {calculateAverage()}</p>
        </div>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout>請選擇單元開始</Layout>} />
          <Route path="/unit/:id" element={
            <Layout>
               {/* 這裡可以根據 ID 載入不同題目 */}
               <QuizUnit 
                  unitId={1} 
                  images={mockImages} 
                  correctOrder={[101, 102, 103, 104, 105]} 
               />
            </Layout>
          } />
          <Route path="/teacher" element={<TeacherView />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;