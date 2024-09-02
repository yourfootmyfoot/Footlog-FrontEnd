
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
        <div>
          {options.map((option, index) => (
            <Option key={index}>{option}</Option>
          ))}
        </div>
      </SheetContainer>
    </>
  );
};

export default BottomSheet;
