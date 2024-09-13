import styled from '@emotion/styled';

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

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 10px;
  font-weight: bold;
  margin: 0;
`;
