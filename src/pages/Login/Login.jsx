// src/pages/Login.jsx
import './Login.css'; // 같은 디렉토리에 있는 스타일을 가져옵니다
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import serverConfig from '@/config/serverConfig'; // 서버 설정을 가져옵니다
import { useHistory } from 'react-router-dom'; // React Router v5에서 useHistory 사용
import axios from 'axios'; // Axios 라이브러리 추가
import { useEffect } from 'react';

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    // 카카오 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('YOUR_KAKAO_APP_KEY'); // 실제 카카오 앱 키로 대체해야 함
    }
  }, []);
  // 로그인 서버 구현완료시 line 66 에 onClick에 바인딩
  const handleKakaoLogin = () => {
    // 카카오 로그인 실행
    if (!window.Kakao) return;
    
    window.Kakao.Auth.login({
      success: async (authObj) => {
        console.log('로그인 성공:', authObj);
        const { access_token } = authObj;

        try {
          // 서버로 토큰 전달
          const response = await axios.post(`${serverConfig.baseUrl}${serverConfig.loginEndpoint}`, {
            token: access_token,
          });

          if (response.status === 200) {
            console.log('토큰 전달 성공');
            history.push('/');
          } else {
            console.error('토큰 전달 실패:', response.status);
            alert('로그인 실패');
          }
        } catch (error) {
          console.error('서버 요청 에러:', error);
          alert('로그인 요청 중 오류가 발생했습니다.');
        }
      },
      fail: (err) => {
        console.error('카카오 로그인 실패:', err);
        alert('카카오 로그인에 실패했습니다.');
      },
    });
  };

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
        <KakaoLoginButton onClick={() => {history.push('/')}} />
      </div>
    </div>
  );
};

export default Login;
