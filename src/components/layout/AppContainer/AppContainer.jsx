// src/components/layout/AppContainer.jsx
import styled from '@emotion/styled';

const AppContainer = styled.div`
  width: 100vw;
  max-width: 400px;
  height: 100vh;
  padding: 5vh 1vw;
  margin: auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 컨텐츠가 위에서부터 시작하도록 조정 */
  min-height: 70vh;
  position: relative; /* 자식 요소의 절대 위치를 위한 상대 위치 */

  @media (max-width: 768px) {
    width: 95vw;
    padding: 6vh 5vw;
  }

  @media (max-width: 480px) {
    width: 100vw;
    padding: 7vh 5vw;
  }
`;

export default AppContainer;
