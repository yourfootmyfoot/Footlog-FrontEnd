import styled from '@emotion/styled';
import kakaoLoginImage from '../../assets/kakao_login_medium_wide.png';
const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 0;
  width: 100%;
  max-width: 250px; /* 버튼의 최대 너비 설정 */
  height: 40px; /* 버튼 높이 설정 */
  overflow: hidden;

  &:hover {
    background-color: #f0c400; /* 마우스 오버 시 배경색 */
  }
`;

const ButtonImage = styled.img`
  height: 100%;
  object-fit: contain;
`;

const KakaoLoginButton = ({ onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <ButtonImage src={kakaoLoginImage} alt="카카오 로그인" />
    </ButtonWrapper>
  );
};

export default KakaoLoginButton;
