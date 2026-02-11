import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase'; // 需自行設定 firebase config
import { doc, setDoc } from 'firebase/firestore';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 登入狀態
  
  // 初始讀取 LocalStorage (功能 7: 復原進度)
  const savedScores = JSON.parse(localStorage.getItem('studentScores')) || {};
  const [scores, setScores] = useState(savedScores);

  // 當分數改變時，存入 LocalStorage (功能 7)
  useEffect(() => {
    localStorage.setItem('studentScores', JSON.stringify(scores));
  }, [scores]);

  // 更新單元分數並上傳給老師 (功能 6)
  const updateScore = async (unitId, score) => {
    const newScores = { ...scores, [unitId]: score };
    setScores(newScores);

    // 計算平均
    const scoreValues = Object.values(newScores);
    const average = scoreValues.reduce((a, b) => a + b, 0) / 5; // 假設5個單元

    // 上傳到 Firebase (老師才看得到)
    if (user && user.role === 'student') {
      try {
        await setDoc(doc(db, "scores", user.username), {
          scores: newScores,
          average: average,
          lastUpdated: new Date()
        });
      } catch (e) {
        console.error("上傳失敗", e);
      }
    }
  };

  const calculateAverage = () => {
    const scoreValues = Object.values(scores);
    if (scoreValues.length === 0) return 0;
    return (scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(1);
  };

  return (
    <AppContext.Provider value={{ user, setUser, scores, updateScore, calculateAverage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);