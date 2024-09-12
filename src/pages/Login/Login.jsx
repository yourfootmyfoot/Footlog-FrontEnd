// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import serverConfig from '@/config/serverConfig'; // 서버 설정을 가져옵니다

const Login = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 카카오 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('j2fw9XOjC98en8nMlOjU2sXuUPiuRwkq'); // 실제 카카오 앱 키로 대체해야 함
    }

    // 로컬 스토리지에서 액세스 토큰 확인
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      verifyToken(accessToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8080/oauth2/authorization/kakao`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.isValid) {
        // 토큰이 유효하면 홈 페이지로 리다이렉트
        history.push('/');
      } else {
        // 토큰이 유효하지 않으면 로딩 상태 해제
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 URL로 리다이렉트
    window.location.href = `http://localhost:8080/oauth2/authorization/kakao`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <div className="responsive-container">
        {/* <img src={mascot} alt="Character" className="login-image" /> */}
        <h2>
          로그인하고 <span role="img" aria-label="soccer ball">⚽</span>을 차러 가볼까요?
        </h2>
        <p>로그인이 필요한 서비스에요.</p>
        <ul className="login-services">
          <li>✅ 경기 상대 모집하기</li>
          <li>✅ 용병 모집/신청하기</li>
          <li>✅ 구단 관리/합류하기</li>
        </ul>
        <KakaoLoginButton onClick={handleKakaoLogin} />
      </div>
    </div>
  );
};

export default Login;