import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import './EnrollMerButton.css';  // 애니메이션을 위한 CSS 파일

const EnrollMerButton = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const navigate = useNavigate();

  // 서브 메뉴 열기 및 닫기
  const shownSubMenuHandler = () => {
    setOpenSubMenu((prev) => !prev);
  };

  // 용병 신청
  const goEnrollMercenaryApp = () => {
    navigate('/mercenary/enroll-app');
  };

  // 용병 모집
  const goEnrollMercenaryRec = () => {
    navigate('/mercenary/enroll-rec');
  };

  return (
    <div className="fixed bottom-20 translate-x-40 z-9">
      <div className={`sub-menu ${openSubMenu ? 'open' : ''}`}>
        <button
          onClick={goEnrollMercenaryApp}
          className="bg-main text-white w-10 h-10 rounded-full text-sm flex justify-center items-center shadow-lg"
        >
          신청
        </button>
        <button
          onClick={goEnrollMercenaryRec}
          className="bg-main text-white w-10 h-10 rounded-full text-sm flex justify-center items-center shadow-lg"
        >
          모집
        </button>
      </div>
      <button
        onClick={shownSubMenuHandler}
        className={`bg-main text-white w-10 h-10 rounded-full text-2xl flex justify-center items-center shadow-lg transition-transform duration-300 z-99 ${openSubMenu ? 'rotate-45' : ''}`}
      >
        +
      </button>
    </div>
  );
}

export default EnrollMerButton;