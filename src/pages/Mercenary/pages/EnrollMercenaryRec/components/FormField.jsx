import { useState } from 'react';
import styled from '@emotion/styled';
import { ErrorMessage } from './Basic';

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #16C79A;
    box-shadow: 0 0 0 2px rgba(22, 199, 154, 0.2);
  }

  &[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      opacity: 1;
      background-color: white;
    }
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
`;

const PositionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: ${props => props.selected ? '#16C79A' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.selected ? '#14B389' : '#f0f0f0'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #16C79A;
    box-shadow: 0 0 0 2px rgba(22, 199, 154, 0.2);
  }
`;

const TimeSelectContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`;

const SelectWrapper = styled.div`
  flex: 1;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #16C79A;
    box-shadow: 0 0 0 2px rgba(22, 199, 154, 0.1);
  }
`;

const TimeLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: bold;
`;

export function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  min = type === 'number' ? 0 : undefined,
  step = type === 'number' ? 1 : undefined,
  disabled = false
}) {
  return (
    <InputLabel htmlFor={id}>
      {label}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        min={min}
        step={step}
        {...register}
        disabled={disabled}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}

export function SelectField({ id, label, options, register, error }) {
  const [selectedPositions, setSelectedPositions] = useState([]);

  const togglePosition = (value) => {
    const newPositions = selectedPositions.includes(value)
      ? selectedPositions.filter(pos => pos !== value)
      : [...selectedPositions, value];
    
    setSelectedPositions(newPositions);
    register.onChange({ target: { name: id, value: newPositions } });
  };

  return (
    <InputLabel htmlFor={id}>
      {label}
      <SelectContainer>
        {options.map((option) => (
          <PositionButton
            key={option.value}
            type="button"
            selected={selectedPositions.includes(option.value)}
            onClick={() => togglePosition(option.value)}
          >
            {option.label}
          </PositionButton>
        ))}
      </SelectContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}

export function TimeRangeSelect({ id, endId, label, register, endRegister, error, endError }) {
  return (
    <InputLabel>
      {label}
      <TimeSelectContainer>
        <SelectWrapper>
          <TimeLabel>시작 시간</TimeLabel>
          <input
            type="time"
            id={id}
            step="1800"
            {...register}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </SelectWrapper>
        <SelectWrapper>
          <TimeLabel>종료 시간</TimeLabel>
          <input
            type="time"
            id={endId}
            step="1800"
            {...endRegister}
          />
          {endError && <ErrorMessage>{endError}</ErrorMessage>}
        </SelectWrapper>
      </TimeSelectContainer>
    </InputLabel>
  );
}

export function TextAreaField({ id, label, register, error }) {
  return (
    <InputLabel htmlFor={id}>
      {label}
      <StyledTextArea 
        id={id}
        {...register}
        placeholder="추가 설명을 입력해주세요"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #16C79A;
  }
`;

export function ObjectSelectField({ id, label, options, register, error }) {
  return (
    <InputLabel htmlFor={id}>
      {label}
      <Select id={id} {...register}>
        <option value="" disabled>
          {`${label} 선택`}
        </option>
        {options.map((option) => (
          <option key={option.clubId} value={option.clubId}>
            {option.clubName}
          </option>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}
