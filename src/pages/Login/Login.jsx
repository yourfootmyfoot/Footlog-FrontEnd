import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    console.log(`auth code : ${code}`)
    if (code) {
      exchangeCodeForToken(code);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  const exchangeCodeForToken = async (code) => {
    try {
      console.log("exchangeCodeForToken Called!")
      console.log(`auth code: ${code}`)
      const response = await axios.post('http://localhost:8080/api/auth/kakao', 
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      console.log('Full response:', response);
      const { accessToken } = response.data;
      console.log(`access token: ${accessToken}`)
      localStorage.setItem('accessToken', accessToken);
      history.push('/');
    } catch (error) {
      console.error('Failed to exchange code for token:', error.response ? error.response.data : error.message);
      setIsLoading(false);
    }
  };

  //const handleKakaoLogin = () => {
  //  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=fee6d16751a5c26bf65b53de89f90b8f&redirect_uri=${encodeURIComponent('http://localhost:3000/login')}&response_type=code`;
  //  window.location.href = KAKAO_AUTH_URL;
    
  //};

  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
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