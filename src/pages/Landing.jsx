import { useHistory } from 'react-router-dom';

const Landing = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/login', {});
  };

  const routeToMatchEnrollPage = () => {
    history.push('/match/enroll');
  };

  const goMatchDetail = () => {
    history.push('/matchDetail', {});
  };

  const goMercenary = () => {
    history.push('/Mercenary', {});
  };

  const goEnrollMercenaryRec = () => {
    history.push('/EnrollMercenaryRec', {});
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
