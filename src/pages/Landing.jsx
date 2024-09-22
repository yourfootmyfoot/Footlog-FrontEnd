import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  const routeToMatchEnrollPage = () => {
    navigate('/match/enroll');
  };

  const goMatchDetail = () => {
    navigate('/matchDetail');
  };

  const goMercenary = () => {
    navigate('/Mercenary');
  };

  const goEnrollMercenaryRec = () => {
    navigate('/EnrollMercenaryRec');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Landing Page</h1>
      <button onClick={handleButtonClick}>로그인 페이지로 이동</button>
      <button onClick={routeToMatchEnrollPage}>경기등록페이지로 이동</button>
      <button onClick={goMatchDetail}>상세 페이지로 이동하기</button>
      <button onClick={goMercenary}>용병 구해요/할래요 페이지로 이동하기</button>
      <button onClick={goEnrollMercenaryRec}>용병 구해요 생성 페이지로 이동하기</button>
    </div>
  );
};

export default Landing;