// src/components/ui/BottomSheet.jsx

import styled from '@emotion/styled';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const SheetContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  max-height: 50vh;
  overflow-y: auto;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 가로로 4개의 칼럼을 설정 */
  gap: 10px; /* 요소 간의 간격 설정 */
  width: 100%; /* 그리드가 부모 컨테이너의 전체 너비를 사용하도록 설정 */
`;

const Option = styled.button`
  background-color: #f1f3f5;
  color: #16c79a;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  width: 100%; /* 버튼이 그리드 셀을 가득 채우도록 설정 */

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
`;

const BottomSheet = ({ options, title, isOpen, onClose }) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SheetContainer isOpen={isOpen}>
        <Title>{title}</Title>
        <GridContainer>
          {options.map((option, index) => (
            <Option key={index}>{option}</Option>
          ))}
        </GridContainer>
      </SheetContainer>
    </>
  );
};

export default BottomSheet;
