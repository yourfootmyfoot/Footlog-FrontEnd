import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const SheetContainer = styled.div`
  position: fixed;
  left: 50%;
  right: 0;
  bottom: ${({ isOpen }) => (isOpen ? '0' : '-50vh')};
  transform: translateX(-50%);
  width: 90vw;
  max-width: 400px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  max-height: 50vh;
  overflow-y: auto;
  transition: bottom 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 95vw;
  }

  @media (max-width: 480px) {
    width: 100vw;
    border-radius: 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`;

const Option = styled.button`
  background-color: #f1f3f5;
  color: #16c79a;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;

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