import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_UNITS_DATA } from '../data/unitsData';
import '../css/Dashboard.css';

// 👉 新增：自動計算該單元總題數 (滿分) 的輔助函式
const getQuestionCount = (unit) => {
  if (!unit) return 0;

  // 如果是分類模式 (category 或 inline-category)，加總所有區塊的 slotCount
  if (unit.type === 'category' || unit.type === 'inline-category') {
    return unit.categories?.reduce((sum, cat) => sum + (cat.slotCount || 1), 0) || 0;
  }

  // 如果是自由模式 (free)，直接抓外層的 slotCount
  if (unit.type === 'free') {
    return unit.slotCount || 0;
  }

  // 預設精準模式 (exact)，抓取正確解答陣列的長度
  return unit.correctOrder?.length || 0;
};

const Dashboard = () => {
  const { user, progress, calculateAverage } = useApp();

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <h2>👋 歡迎回來，{user.username}！</h2>
        <p>目前總平均分數：<strong>{calculateAverage()} 分</strong></p>
      </div>

      <div className="dashboard-grid">
        {ALL_UNITS_DATA.map((unit) => {
          const unitId = `unit_${unit.id}`;
          const unitData = progress[unitId];
          const isCompleted = unitData?.submitted;

          return (
            <div key={unit.id} className={`dash-card ${isCompleted ? 'completed' : 'pending'}`}>
              <div className="dash-card-header">
                <h3>{unit.title}</h3>
                <span className="status-badge">
                  {isCompleted ? '✅ 已完成' : '⏳ 尚未作答'}
                </span>
              </div>
              <div className="dash-card-body">
                {isCompleted ? (
                  <div className="score-display">
                    {/* 👉 將 5 替換成動態計算的 getQuestionCount(unit) */}
                    <span className="score-number">{unitData.score}</span> / {getQuestionCount(unit)} 分
                  </div>
                ) : (
                  <div className="score-display text-muted">-- / {getQuestionCount(unit)} 分</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;