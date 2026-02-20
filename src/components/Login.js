import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [step, setStep] = useState(1);
  const [inputCode, setInputCode] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [studentName, setStudentName] = useState('');
  const { setUser } = useApp();
  const navigate = useNavigate();

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

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (studentName.trim() === '') {
      alert('請輸入您的真實姓名以便老師登記分數！');
      return;
    }
    // 將學生自己填寫的名字存為 username，資料庫就會紀錄這個名字
    setUser({ username: studentName, role: 'student' });
    navigate('/unit/1');
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