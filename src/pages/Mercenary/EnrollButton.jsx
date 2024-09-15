import { useHistory } from "react-router-dom"; // useHistory 훅 사용
import { useState } from "react";
import "./EnrollButton.css";
// import styles from './pages/MercenaryChoice.module.css';  // 수정된 경로

const EnrollButton = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const history = useHistory(); // useHistory 훅 사용하여 history 객체 생성


  const shownSubMenuHandler = () => {
    setOpenSubMenu((prev) => !prev);
  };

  // 용병 구해요
  const goEnrollMercenaryApp = () => {
    history.push('/EnrollMercenaryApp');
  };


  // 용병 구해요
  const goEnrollMercenaryRec = () => {
    history.push('/EnrollMercenaryRec');
  };

  return (
    <div className="floating-menu">
      <div className={`sub-menu ${openSubMenu ? 'open' : ''}`}>
        <ul>
          <li onClick={goEnrollMercenaryApp}>용병 신청</li>
          <li onClick={goEnrollMercenaryRec}>용병 모집</li>
        </ul>
   
      </div>
      <button className="menu-btn" onClick={shownSubMenuHandler}>
        <img src="src/pages/Mercenary/EnrollButton.png" alt="메뉴"/>
      </button>
    </div>
  );
};

export default EnrollButton;
