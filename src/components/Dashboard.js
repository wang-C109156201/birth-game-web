import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_UNITS_DATA } from '../data/unitsData';
import '../css/Dashboard.css';

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
                    <span className="score-number">{unitData.score}</span> / 5 分
                  </div>
                ) : (
                  <div className="score-display text-muted">-- / 5 分</div>
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