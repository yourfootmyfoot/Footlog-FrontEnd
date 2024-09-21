import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./EnrollButton.css";

const EnrollButton = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const navigate = useNavigate();

  const shownSubMenuHandler = () => {
    setOpenSubMenu((prev) => !prev);
  };

  // 용병 신청
  const goEnrollMercenaryApp = () => {
    navigate('/EnrollMercenaryApp');
  };

  // 용병 모집
  const goEnrollMercenaryRec = () => {
    navigate('/EnrollMercenaryRec');
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
