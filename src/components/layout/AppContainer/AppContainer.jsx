// src/components/layout/AppContainer.jsx
import styled from '@emotion/styled';

const AppContainer = styled.div`
  width: 90vw;
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
  justify-content: center;
  min-height: 70vh;

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
