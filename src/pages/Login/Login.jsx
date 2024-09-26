import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      exchangeCodeForToken(code);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  const exchangeCodeForToken = async (code) => {
    try {
      console.log("exchangeCodeForToken Called!")
      // 토큰 교환 로직...
      navigate('/match');
    } catch (error) {
      console.error('Failed to exchange code for token:', error.response ? error.response.data : error.message);
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=262c56061ee06d4004d2f9b94db133a4&redirect_uri=http://192.168.0.32:8080/api/auth/kakao/login';
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <div className="responsive-container">
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