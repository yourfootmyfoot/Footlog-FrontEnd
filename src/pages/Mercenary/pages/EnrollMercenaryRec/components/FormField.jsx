// form에서 재사용 가능한 입력 필드 컴포넌트들을 제공한다.

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
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  width: auto;
  margin: 0 10px;
`;

// 텍스트, 숫자, 날짜 등의 입력을 받는 필드
export function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  onChange,
  value, }) {
  return (

    <InputLabel htmlFor={id}>
      {label}

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        value={value}
        onChange={onChange} />

      {error && <ErrorMessage>{error}</ErrorMessage>}

    </InputLabel>
  );
}

// id : 입력 필드의 고유 ID.
// labe : 필드에 대한 레이브 텍스트
// type : 입력 필드의 타입(text)
// placeholder : 필드의 자리 표시자
// register : React Hook Form에서 사용하는 필드 등록 메서드
// error : 유효성 검사 오류가 발생했을 때 표시할 메시지
// onChange : 입력 값이 변경될 때 호출되는 콜백 함수
// value : 입력 필드의 현재 값

// 드롭다운 선택 필드
export function SelectField({ id, label, matchList, register, error }) {
  return (
    // htmlFor : 별칭
    <InputLabel htmlFor={id}>

      {label}

      <Select id={id} {...register}>
        <option value="" disabled>
          {`Select ${label}`}
        </option>

        {matchList.map((match) => (
          <option key={match.matchCode} value={match.matchCode}>
            {match.myClub.clubName} : {match.schedule.date}({match.schedule.day}) {match.schedule.startTime} ~ {match.schedule.endTime}
          </option>
        ))}

      </Select>

      {error && <ErrorMessage>{error}</ErrorMessage>}

    </InputLabel>
  );
}


// 체크 박스 입력 필드
export function CheckboxField({ label, register }) {

  return (
    <InputLabel>

      {label}

      <Checkbox type="checkbox" {...register} />

    </InputLabel>
  );
}
