// SettingsPage.js
import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [nickname, setNickname] = useState('테스트 유저');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert('Settings saved!');
    // 여기에 저장 로직 추가
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
          placeholder="Enter new nickname"
        />
      </div>

      {/* 알림 설정 */}
      <div className="setting-item">
        <h3>알림 수신 설정</h3>
        <label>
          <input 
            type="checkbox" 
            checked={emailNotifications} 
            onChange={() => setEmailNotifications(!emailNotifications)} 
          />
          알림을 수신합니다.
        </label>
      </div>

      {/* 다크 모드 설정 */}
      <div className="setting-item">
        <h3>다크모드 설정</h3>
        <label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          다크모드를 사용합니다.
        </label>
      </div>

      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default Settings;
