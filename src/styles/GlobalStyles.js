import { Global, css } from '@emotion/react';

const globalStyles = css`
  /* 기존 전역 스타일 */
  
  /* 메인 컨텐츠를 위한 공통 클래스 추가 */
  .main-container {
    padding-bottom: 80px; /* Footer 높이(약 60px) + 여유 공간(20px) */
    min-height: 100vh;
  }

  /* 스크롤바 스타일링 */
  body {
    overflow-y: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />; 