import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './Login.css';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';


import styled from '@emotion/styled';
import checkIcon from '@/assets/check-button.svg';
import mascotIcon from '@/assets/mascot.svg';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 5vh 1vw;
  background-color: #fff;
`;

const MascotImage = styled.img`
  width: clamp(120px, 24vh, 180px);
  height: auto;
  margin-bottom: 4vh;
`;

const Title = styled.h2`
  font-size: clamp(18px, 5vw, 24px);
  font-weight: bold;
  margin-bottom: 2vh;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: clamp(12px, 3vw, 16px);
  color: #666;
  margin-bottom: 4vh;
  /*text-align: center;*/
`;

const ServiceList = styled.ul`
  display: block;
  justify-content: baseline;
  list-style-type: none;
  padding: 0;
  margin-bottom: 4vh;
  width: 100%;
  max-width: min(280px, 90vw);
`;

const ServiceItem = styled.li`
  display: flex;
  align-items: center;
  margin-left: 5vw;
  margin-right: 1vw;
  margin-bottom: 2vh;
  font-size: clamp(12px, 3vw, 16px);
`;

const CheckIcon = styled.img`
  width: clamp(16px, 4vw, 20px);
  height: auto;
  margin-right: 2vw;
`;

const StyledKakaoButton = styled(KakaoLoginButton)`
  width: 100%;
  max-width: min(280px, 90vw);
`;


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
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=262c56061ee06d4004d2f9b94db133a4&redirect_uri=http://localhost:8080/api/auth/kakao/login';
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LoginContainer>
      <MascotImage src={mascotIcon} alt="Mascot" />
      <Title>
        로그인하고 <span role="img" aria-label="soccer ball">⚽</span>을 차러 가볼까요?
      </Title>
      <Subtitle>로그인이 필요한 서비스에요.</Subtitle>
      <ServiceList>
        <ServiceItem>
          <CheckIcon src={checkIcon} alt="check" />
          경기 상대 모집하기
        </ServiceItem>
        <ServiceItem>
          <CheckIcon src={checkIcon} alt="check" />
          용병 모집/신청하기
        </ServiceItem>
        <ServiceItem>
          <CheckIcon src={checkIcon} alt="check" />
          구단 관리/합류하기
        </ServiceItem>
      </ServiceList>
      <StyledKakaoButton onClick={handleKakaoLogin} />
    </LoginContainer>
  );
};

export default Login;