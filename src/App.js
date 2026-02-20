import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import QuizUnit from './components/QuizUnit';
import TeacherView from './components/TeacherView';
import Layout from './components/Layout';
import './App.css'; 

// 這裡定義 5 個不同單元的內容
const ALL_UNITS_DATA = [
  {
    id: 1, title: '單元 1：基礎分類',
    images: [{ id: 11, content: '蘋果' }, { id: 12, content: '香蕉' }, { id: 13, content: '高麗菜' }, { id: 14, content: '空心菜' }, { id: 15, content: '葡萄' }],
    correctOrder: [11, 12, 13, 14, 15] 
  },
  {
    id: 2, title: '單元 2：進階配對',
    images: [{ id: 21, content: 'A' }, { id: 22, content: 'B' }, { id: 23, content: 'C' }, { id: 24, content: 'D' }, { id: 25, content: 'E' }],
    correctOrder: [21, 22, 23, 24, 25]
  },
  {
    id: 3, title: '單元 3：邏輯排序',
    images: [{ id: 31, content: '步驟一' }, { id: 32, content: '步驟二' }, { id: 33, content: '步驟三' }, { id: 34, content: '步驟四' }, { id: 35, content: '步驟五' }],
    correctOrder: [31, 32, 33, 34, 35]
  },
  {
    id: 4, title: '單元 4：實務操作',
    images: [{ id: 41, content: '圖4-1' }, { id: 42, content: '圖4-2' }, { id: 43, content: '圖4-3' }, { id: 44, content: '圖4-4' }, { id: 45, content: '圖4-5' }],
    correctOrder: [41, 42, 43, 44, 45]
  },
  {
    id: 5, title: '單元 5：綜合測驗',
    images: [{ id: 51, content: '觀念A' }, { id: 52, content: '觀念B' }, { id: 53, content: '觀念C' }, { id: 54, content: '觀念D' }, { id: 55, content: '觀念E' }],
    correctOrder: [51, 52, 53, 54, 55]
  }
];

const MainApp = () => {
  const { user } = useApp();
  
  if (!user) return <Login />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/unit/1" replace />} />
        {/* 利用 :id 動態路由切換 5 個畫面 */}
        <Route path="/unit/:id" element={<QuizUnit unitData={ALL_UNITS_DATA} />} />
        <Route path="/teacher" element={<TeacherView />} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <MainApp />
      </Router>
    </AppProvider>
  );
};

export default App;