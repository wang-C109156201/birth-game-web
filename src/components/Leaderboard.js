import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useApp } from '../context/AppContext';
import '../css/Leaderboard.css';

// 👉 專門負責「名次跳動動畫」的微型元件
const AnimatedRank = ({ start, end }) => {
  const [displayRank, setDisplayRank] = useState(start);

  useEffect(() => {
    if (start === end) return;
    let current = start;
    const step = start > end ? -1 : 1; // 判斷是名次上升(-)還是下降(+)
    
    // 每 0.4 秒跳動一個名次，營造遊戲感
    const timer = setInterval(() => {
      current += step;
      setDisplayRank(current);
      if (current === end) clearInterval(timer);
    }, 400); 

    return () => clearInterval(timer);
  }, [start, end]);

  return <span className="rank-num animate-pulse">第 {displayRank} 名</span>;
};

const Leaderboard = () => {
  const [rankedStudents, setRankedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnimations, setShowAnimations] = useState(false); 
  
  // 👉 拿出 user 資訊用來核對身分
  const { progress, user } = useApp(); 
  const myCompletedCount = Object.values(progress).filter(p => p.submitted).length;

  useEffect(() => {
    const fetchAndRank = async () => {
      const querySnapshot = await getDocs(collection(db, "scores"));
      const todayString = new Date().toDateString();

      let students = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const completedCount = data.scores ? Object.keys(data.scores).length : 0;
        return {
          id: doc.id,
          name: doc.id,
          totalScore: data.totalScore || 0, // 👉 改抓總分
          completedCount: completedCount,
          lastUpdated: data.lastUpdated
        };
      }).filter(student => {
        if (!student.lastUpdated) return false;
        return student.lastUpdated.toDate().toDateString() === todayString;
      });

      // 👉 改為用總分 (totalScore) 排序
      students.sort((a, b) => b.totalScore - a.totalScore);

      let currentRank = 1;
      let previousScore = null;
      let rankOffset = 0;

      const ranked = students.map((student) => {
        if (student.totalScore === previousScore) {
          rankOffset++; 
        } else {
          currentRank = currentRank + rankOffset;
          rankOffset = 1; 
          previousScore = student.totalScore;
        }

        const lastRankData = JSON.parse(localStorage.getItem('lastRanks')) || {};
        const lastRank = lastRankData[student.id];
        let trend = 'same'; 
        
        if (lastRank) {
          if (currentRank < lastRank) trend = 'up';
          if (currentRank > lastRank) trend = 'down';
        }

        // 把他上次的名次也存進去，給動畫元件使用
        return { ...student, rank: currentRank, trend, lastRank: lastRank || currentRank };
      });

      setRankedStudents(ranked);
      setLoading(false);
      setTimeout(() => setShowAnimations(true), 100);

      const newRankData = {};
      ranked.forEach(s => newRankData[s.id] = s.rank);
      localStorage.setItem('lastRanks', JSON.stringify(newRankData));
    };

    fetchAndRank();
  }, []);

  if (loading) return <div className="fade-in" style={{textAlign:'center', padding:'50px'}}>讀取本日英雄榜中...</div>;

  const renderTrophy = (rank) => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🎖️';
  };

  return (
    <div className="quiz-container fade-in" style={{ maxWidth: '800px' }}>
      <div className="quiz-header" style={{ textAlign: 'center' }}>
        <h2>🏆 本日班級英雄榜</h2>
        <p>目前你完成了 {myCompletedCount} 個單元！來看看大家<strong>今天</strong>的成績吧。</p>
      </div>

      <div className="leaderboard-list">
        {rankedStudents.map((student, index) => {
          // 👉 判斷這筆資料是不是現在正在操作的學生
          const isMe = user?.username === student.id;

          return (
            <div 
              key={student.id} 
              // 如果是我，就加上 highlight-me 的 CSS
              className={`leaderboard-item fade-in-up ${isMe ? 'highlight-me' : ''}`} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="lb-rank">
                <span className="trophy">{renderTrophy(student.rank)}</span>
                
                {/* 👉 如果是我，且名次有變動，就呼叫跳動動畫元件 */}
                {isMe && student.lastRank !== student.rank ? (
                  <AnimatedRank start={student.lastRank} end={student.rank} />
                ) : (
                  <span className="rank-num">第 {student.rank} 名</span>
                )}
              </div>
              
              <div className="lb-name">
                {student.name}
                {/* 加上一個專屬徽章標記 */}
                {isMe && <span className="me-badge">⭐ 你</span>}
              </div>
              
              <div className="lb-stats">
                <span className="avg-score">總分: {student.totalScore} 分</span>
              </div>

              <div className="lb-trend">
                {student.trend === 'up' && <span className={`trend up ${showAnimations ? 'animate-pop' : ''}`}>🚀 升</span>}
                {student.trend === 'down' && <span className={`trend down ${showAnimations ? 'animate-drop' : ''}`}>📉 降</span>}
                {student.trend === 'same' && <span className="trend same">➖</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;