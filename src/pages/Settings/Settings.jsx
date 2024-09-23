// SettingsPage.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 사용
import axios from 'axios';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();  // useNavigate로 로그인 페이지로 이동
  const [nickname, setNickname] = useState('테스트 유저');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 여부 상태 관리

  useEffect(() => {
    // 로그인 여부 확인 API 호출
    axios.get('http://localhost:8080/api/auth/status', { withCredentials: true })
      .then(response => {
        const data = response.data;
        setIsLoggedIn(data.isLoggedIn);  // 로그인 상태 설정
      })
      .catch(error => {
        console.error("로그인 상태 확인 중 오류 발생:", error);
        setIsLoggedIn(false);  // 오류 발생 시 로그아웃 상태로 간주
      });
  }, []);

  const handleSave = () => {
    alert('변경 사항이 저장되었습니다!');
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      // 로그아웃 API 호출
      axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true })
        .then(() => {
          alert('로그아웃되었습니다!');
          setIsLoggedIn(false);  // 로그아웃 상태로 설정
        })
        .catch(error => {
          console.error('로그아웃 중 오류 발생:', error);
          alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        });
    } else {
      // 로그인 화면으로 이동
      navigate('/login');
    }
  };

  const handleInquiry = () => {
    alert('1대1 문의로 이동합니다!');
  };

  return (
    <div className="settings-page">
      {/* 닉네임 변경 */}
      <div className="setting-item">
        <h3>닉네임 변경</h3>
        <input 
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          placeholder="새로운 닉네임을 입력하세요."
        />
      </div>

      {/* 1대1 문의 */}
      <div className="setting-item">
        <h3>1대1 문의</h3>
        <button className="inquiry-button" onClick={handleInquiry}>문의하기</button>
      </div>

      {/* 알림 설정 */}
      <div className="setting-item">
        <h3>알림</h3>
        <div className="toggle-buttons">
          <button
            className={notifications ? "active" : ""}
            onClick={() => setNotifications(true)}
          >
            켜짐
          </button>
          <button
            className={!notifications ? "active" : ""}
            onClick={() => setNotifications(false)}
          >
            꺼짐
          </button>
        </div>
      </div>

      {/* 다크 모드 설정 */}
      <div className="setting-item">
        <h3>다크 모드</h3>
        <div className="toggle-buttons">
          <button
            className={darkMode ? "active" : ""}
            onClick={() => setDarkMode(true)}
          >
            켜짐
          </button>
          <button
            className={!darkMode ? "active" : ""}
            onClick={() => setDarkMode(false)}
          >
            꺼짐
          </button>
        </div>
      </div>

       {/* 저장 및 로그인/로그아웃 버튼 */}
      <div className="save-button-container">
        <button className="logout-button" onClick={handleLogout}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
        <button className="save-button" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default Settings;
