import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // 👉 記得引入 db
import { doc, getDoc } from 'firebase/firestore'; // 👉 引入 getDoc

const Login = () => {
  const [step, setStep] = useState(1);
  const [inputCode, setInputCode] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();
  const { setUser, setProgress } = useApp(); 

  const handleVerify = (e) => {
    e.preventDefault();
    if (inputCode === '0000' && inputPass === '5555') {
      setStep(2); // 密碼正確，進入第二步填寫姓名
    } else if (inputCode === 'teacher' && inputPass === 'admin') {
      setUser({ username: 'Teacher', role: 'teacher' });
      navigate('/teacher');
    } else {
      alert('課程代碼或密碼錯誤，請重新輸入！');
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (studentName.trim() === '') {
      alert('請輸入您的真實姓名！');
      return;
    }

    try {
      // 檢查 Firebase 中是否已經有這個名字的資料
      const docRef = doc(db, "scores", studentName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // 如果有雲端進度，就把它抓下來覆蓋到目前的狀態
        if (data.progressData) {
          setProgress(data.progressData);
        }
        alert(`歡迎回來，${studentName}！已為你從雲端恢復之前的學習進度。`);
      } else {
        // 沒有這個名字 -> 新同學，清空進度，避免吃到上一台電腦殘留的紀錄
        setProgress({});
        alert(`歡迎加入，${studentName}！已為你建立全新學習檔案。`);
      }

      // 設定使用者並進入單元 1
      setUser({ username: studentName, role: 'student' });
      navigate('/unit/1');

    } catch (error) {
      console.error("讀取資料失敗:", error);
      alert("連線資料庫失敗，請確認網路狀態。");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">📝 互動學習平台</h2>
        
        {step === 1 ? (
          <form onSubmit={handleVerify} className="login-form">
            <p className="login-subtitle">請輸入老師發布的課程代碼與密碼</p>
            <input 
              className="ui-input" 
              placeholder="課程代碼 (例如: 0000)" 
              value={inputCode} 
              onChange={e => setInputCode(e.target.value)} 
            />
            <input 
              className="ui-input" 
              type="password" 
              placeholder="課程密碼 (例如: 5555)" 
              value={inputPass} 
              onChange={e => setInputPass(e.target.value)} 
            />
            <button type="submit" className="ui-button primary-btn">驗證身分</button>
          </form>
        ) : (
          <form onSubmit={handleNameSubmit} className="login-form slide-in">
            <p className="login-subtitle">驗證成功！請輸入您的真實姓名</p>
            <input 
              className="ui-input" 
              placeholder="例如：王小明" 
              value={studentName} 
              onChange={e => setStudentName(e.target.value)} 
              autoFocus
            />
            <button type="submit" className="ui-button success-btn">進入教室</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;