import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import QuizUnit from './components/QuizUnit';
import TeacherView from './components/TeacherView';
import Layout from './components/Layout';
import Leaderboard from './components/Leaderboard'; // 排行榜
import { ALL_UNITS_DATA } from './data/unitsData'; // 引入資料
import Dashboard from './components/Dashboard'; // 每單元分數總覽
import './App.css'; 

const MainApp = () => {
  const { user } = useApp();
  if (!user) return <Login />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/unit/1" replace />} />
        <Route path="/unit/:id" element={<QuizUnit unitData={ALL_UNITS_DATA} />} />
        <Route path="/teacher" element={<TeacherView />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> {/* 新增排行榜路由 */}
        <Route path="/dashboard" element={<Dashboard />}  /> {/* 新增每單元分數總覽路由 */}
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