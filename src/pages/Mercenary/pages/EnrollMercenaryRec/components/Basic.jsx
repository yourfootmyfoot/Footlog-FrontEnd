// MercenaryEnrollForm과 FormField에서 사용되어 일관된 스타일을 제공
import styled from '@emotion/styled';


// 폼을 감싸는 컨테이너로, 레이아웃과 스타일을 정의한다.
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 70px;
`;

// 폼 제출 버튼의 스타일을 정의한다.
export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #16C79A;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #14B389;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(22, 199, 154, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(22, 199, 154, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(100, 100);
      opacity: 0;
    }
  }
`;


// 여러 메세지의 스타일을 정의한다.
export const ErrorMessage = styled.p`
  color: red;
  font-size: 10px;
  font-weight: bold;
  margin: 0;
`;
