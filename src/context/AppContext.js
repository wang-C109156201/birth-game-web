import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 讀取 LocalStorage (包含每個單元的 slots, submitted 狀態, 與分數)
  const savedProgress = JSON.parse(localStorage.getItem('studentProgress')) || {};
  const [progress, setProgress] = useState(savedProgress);

  // 當進度改變時，自動存入 LocalStorage (防手殘關閉)
  useEffect(() => {
    localStorage.setItem('studentProgress', JSON.stringify(progress));
  }, [progress]);

  // 更新單元進度 (拖曳中隨時呼叫)
  const saveUnitProgress = (unitId, slots, submitted = false, score = 0) => {
    const newProgress = {
      ...progress,
      [unitId]: { slots, submitted, score }
    };
    setProgress(newProgress);

    // 如果是「已提交」狀態，才計算平均並回傳給老師的 Firebase
    if (submitted && user && user.role === 'student') {
      uploadToFirebase(newProgress);
    }
  };

const uploadToFirebase = async (currentProgress) => {
    const completedUnits = Object.values(progress).filter(p => p.submitted);
    // 👉 2. 算出總分
    const totalScore = completedUnits.reduce((sum, p) => sum + p.score, 0);

    const scoresForTeacher = {};
    Object.keys(currentProgress).forEach(key => {
      if (currentProgress[key].submitted) {
        scoresForTeacher[key] = currentProgress[key].score;
      }
    });

try {
      await setDoc(doc(db, "scores", user.username), {
        scores: scoresForTeacher,
        totalScore: totalScore, 
        progressData: currentProgress,
        lastUpdated: new Date()
      });
    } catch (e) {
      console.error("上傳失敗", e);
    }
  };

  const calculateAverage = () => {
    const completedUnits = Object.values(progress).filter(p => p.submitted);
    if (completedUnits.length === 0) return 0;
    const total = completedUnits.reduce((sum, p) => sum + p.score, 0);
    return (total / completedUnits.length).toFixed(1);
  };
  const calculateTotalScore = () => {
    const completedUnits = Object.values(progress).filter(p => p.submitted);
    if (completedUnits.length === 0) return 0;
    return completedUnits.reduce((sum, p) => sum + p.score, 0);
  };

  return (
    <AppContext.Provider value={{ user, setUser, progress, setProgress, saveUnitProgress, calculateAverage, calculateTotalScore }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);