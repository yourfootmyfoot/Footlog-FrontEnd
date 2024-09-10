// src/components/ui/Button.jsx
import styled from '@emotion/styled';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: #000;
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  span {
    margin-right: 8px;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

const Button = ({ text, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <span role="img" aria-label="chat bubble">💬</span> {text}
    </StyledButton>
  );
};

export default Button;
