import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useApp } from '../context/AppContext';
import '../css/Dashboard.css';

const Leaderboard = () => {
  const [rankedStudents, setRankedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  // 👉 2. 拿出目前登入學生的進度
  const { progress } = useApp();
  const [showAnimations, setShowAnimations] = useState(false);

  // 👉 3. 計算他目前有幾個單元的 submitted 是 true
  const myCompletedCount = Object.values(progress).filter(p => p.submitted).length;

  useEffect(() => {
    const fetchAndRank = async () => {
      const querySnapshot = await getDocs(collection(db, "scores"));

      // 👉 取得今天的日期字串 (例如: "Fri Feb 20 2026")
      const todayString = new Date().toDateString();

      let students = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const completedCount = data.scores ? Object.keys(data.scores).length : 0;
        return {
          id: doc.id,
          name: doc.id,
          average: data.average || 0,
          completedCount: completedCount,
          lastUpdated: data.lastUpdated // Firebase 的 Timestamp
        };
      }).filter(student => {
        // 👉 過濾：只保留「最後更新時間」是「今天」的學生
        if (!student.lastUpdated) return false;
        const updatedDate = student.lastUpdated.toDate();
        return updatedDate.toDateString() === todayString;
      });

      // 依照平均分數由高到低排序
      students.sort((a, b) => b.average - a.average);

      let currentRank = 1;
      let previousScore = null;
      let rankOffset = 0;

      const ranked = students.map((student) => {
        if (student.average === previousScore) {
          rankOffset++;
        } else {
          currentRank = currentRank + rankOffset;
          rankOffset = 1;
          previousScore = student.average;
        }

        const lastRankData = JSON.parse(localStorage.getItem('lastRanks')) || {};
        const lastRank = lastRankData[student.id];
        let trend = 'same';

        if (lastRank) {
          if (currentRank < lastRank) trend = 'up';
          if (currentRank > lastRank) trend = 'down';
        }

        return { ...student, rank: currentRank, trend };
      });

      setRankedStudents(ranked);
      setLoading(false);

      // 延遲一點點時間觸發動畫，讓使用者點進來能清楚看到箭頭跳出來
      setTimeout(() => setShowAnimations(true), 100);

      const newRankData = {};
      ranked.forEach(s => newRankData[s.id] = s.rank);
      localStorage.setItem('lastRanks', JSON.stringify(newRankData));
    };

    fetchAndRank();
  }, []);

  if (loading) return <div className="fade-in">讀取本日英雄榜中...</div>;

  const renderTrophy = (rank) => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🎖️';
  };

  const renderTrend = (trend) => {
    // 加上 showAnimations 判斷，確保畫面載入後才播動畫
    if (trend === 'up') return <span className={`trend up ${showAnimations ? 'animate-pop' : ''}`}>🚀 升</span>;
    if (trend === 'down') return <span className={`trend down ${showAnimations ? 'animate-drop' : ''}`}>📉 降</span>;
    return <span className="trend same">➖</span>;
  };

  return (
    <div className="quiz-container fade-in" style={{ maxWidth: '800px' }}>
      <div className="quiz-header" style={{ textAlign: 'center' }}>
        <h2>🏆 班級英雄榜</h2>
        <p>目前你已經完成了 {myCompletedCount} 個單元！來看看大家目前的成績吧。</p>
      </div>

      <div className="leaderboard-list">
        {rankedStudents.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>今天還沒有人完成測驗喔！</p>
        ) : (
          rankedStudents.map((student, index) => (
            // 讓每一列有依序載入的瀑布流效果 (配合 CSS 的 index)
            <div key={student.id} className="leaderboard-item fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="lb-rank">
                <span className="trophy">{renderTrophy(student.rank)}</span>
                <span className="rank-num">第 {student.rank} 名</span>
              </div>

              <div className="lb-name">{student.name}</div>
              <div className="lb-stats">
                <span className="avg-score">平均: {student.average} 分</span>
                <span className="unit-count">完成: {student.completedCount} 單元</span>
              </div>

              <div className="lb-trend">
                {renderTrend(student.trend)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;