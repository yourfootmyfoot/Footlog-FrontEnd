import { useHistory } from 'react-router-dom';

const Landing = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/login', {});
  };

  const routeToMatchEnrollPage = () => {
    history.push("/match-enroll")
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Landing Page</h1>
      <button onClick={handleButtonClick}>로그인 페이지로 이동</button>
      <button onClick={routeToMatchEnrollPage}>경기등록페이지로 이동</button>
    </div>
  );
};

export default Landing;
