import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [inputUser, setInputUser] = useState('');
  const [inputPass, setInputPass] = useState('');
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 功能 3: 簡單字串比對
    if (inputUser === '0000' && inputPass === '5555') {
      setUser({ username: inputUser, role: 'student' });
      navigate('/unit/1');
    } else if (inputUser === 'teacher' && inputPass === 'admin') {
      setUser({ username: 'Teacher', role: 'teacher' });
      navigate('/teacher');
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2>學生登入</h2>
        <input placeholder="帳號" value={inputUser} onChange={e => setInputUser(e.target.value)} />
        <input type="password" placeholder="密碼" value={inputPass} onChange={e => setInputPass(e.target.value)} />
        <button type="submit">登入</button>
      </form>
    </div>
  );
};

export default Login;