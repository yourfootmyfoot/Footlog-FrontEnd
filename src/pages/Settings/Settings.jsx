// SettingsPage.js
import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [nickname, setNickname] = useState('테스트 유저');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert('변경 사항이 저장되었습니다!');
  };

  const handleLogout = () => {
    alert('로그아웃되었습니다!');
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

      {/* 저장 및 로그아웃 버튼 */}
      <div className="save-button-container">
        <button className="logout-button" onClick={handleLogout}>로그아웃</button>
        <button className="save-button" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default Settings;
