import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

// 建立一個全域的狀態中心 (Context)，讓所有元件都能拿到這裡的資料
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 紀錄目前登入的使用者資訊
  const [user, setUser] = useState(null);

  // 1. 初始化進度：網頁一打開時，先去瀏覽器的 LocalStorage 找看看有沒有之前存的進度
  const savedProgress = JSON.parse(localStorage.getItem('studentProgress')) || {};
  const [progress, setProgress] = useState(savedProgress);

  // 2. 自動存檔機制：只要 progress 狀態一有變動，就立刻寫入 LocalStorage，防止學生不小心關閉網頁心血白費
  useEffect(() => {
    localStorage.setItem('studentProgress', JSON.stringify(progress));
  }, [progress]);

  // 3. 更新單元進度：負責把學生拖曳的最新狀態、是否提交、分數更新到系統中
  const saveUnitProgress = (unitId, slots, submitted = false, score = 0) => {
    // 打包最新的進度狀態
    const newProgress = {
      ...progress,
      [unitId]: { slots, submitted, score }
    };
    setProgress(newProgress);

    // 如果學生按下了「提交」，就觸發上傳 Firebase 的動作
    if (submitted && user && user.role === 'student') {
      uploadToFirebase(newProgress); // 👉 注意：這裡傳進去的是最新的 newProgress
    }
  };

  // 4. 上傳雲端：負責將學生的成績與進度同步到 Firebase 資料庫
  const uploadToFirebase = async (currentProgress) => {
    // 👉 修正 Bug：必須使用最新傳進來的 currentProgress 來過濾出已完成的單元
    const completedUnits = Object.values(currentProgress).filter(p => p.submitted);
    
    // 計算總分 (將所有已完成單元的分數加總)
    const totalScore = completedUnits.reduce((sum, p) => sum + p.score, 0);

    // 整理出一包專門給老師看的成績單格式
    const scoresForTeacher = {};
    Object.keys(currentProgress).forEach(key => {
      if (currentProgress[key].submitted) {
        scoresForTeacher[key] = currentProgress[key].score;
      }
    });

    // 執行上傳到 Firestore
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

  // 5. 計算平均分 (供前端畫面顯示用)
  const calculateAverage = () => {
    const completedUnits = Object.values(progress).filter(p => p.submitted);
    if (completedUnits.length === 0) return 0;
    const total = completedUnits.reduce((sum, p) => sum + p.score, 0);
    return (total / completedUnits.length).toFixed(1);
  };

  // 6. 計算總分 (供前端畫面與排行榜顯示用)
  const calculateTotalScore = () => {
    const completedUnits = Object.values(progress).filter(p => p.submitted);
    if (completedUnits.length === 0) return 0;
    return completedUnits.reduce((sum, p) => sum + p.score, 0);
  };

  // 將這些狀態與函式打包，提供給底下的子元件使用
  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      progress, 
      setProgress, 
      saveUnitProgress, 
      calculateAverage, 
      calculateTotalScore 
    }}>
      {children}
    </AppContext.Provider>
  );
};

// 建立一個捷徑 Hook，讓其他元件只要呼叫 useApp() 就能拿到上面的資料
export const useApp = () => useContext(AppContext);