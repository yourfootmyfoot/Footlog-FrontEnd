import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { postMercenaryEnroll } from './services/Mercenary';
import { FormContainer, Button } from './components/Basic';
import { SelectField, InputField } from './components/FormField';
import { getMatchList } from '../../../Match/apis/MatchAPI';

export const SearchButton = styled.button`
  flex-grow: 1;
  padding: 10px 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

function MercenaryEnrollForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onChange' });

  const [matchList, setMatchList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null); // 선택된 매치 정보 저장
  const [showAdditionalFields, setShowAdditionalFields] = useState(false); // 추가 필드 표시 여부 상태 관리

  useEffect(() => {
    const fetchMatches = async () => {
      const matches = await getMatchList();
      setMatchList(matches);
    };
    fetchMatches();
  }, []);

  const onSubmit = (data) => {
    postMercenaryEnroll(data);
    console.log(data);
  };

  // 매치 선택 시 선택된 매치 데이터를 저장
  const selectedMatchCode = watch('match');
  useEffect(() => {
    const match = matchList.find(match => match.matchCode === parseInt(selectedMatchCode));
    setSelectedMatch(match || null);
  }, [selectedMatchCode, matchList]);

  // 추가 입력 필드를 표시하는 함수
  const handleShowAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  return (
    <FormContainer>
      <h2>Football Enrollment Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 매치 선택 필드 */}
        <SelectField
          label="Select Match"
          matchList={matchList}
          register={register('match', {
            required: 'Please select match',
          })}
          error={errors.match?.message}
        />

        {/* 경기 등록 버튼 */}
        <Button onClick={handleShowAdditionalFields}>경기 세부 정보 입력</Button>

        {/* 추가 필드가 표시될 때만 나타남 */}
        {showAdditionalFields && (
          <>
            <InputField
              id="clubLevel"
              label="Club Level"
              register={register('clubLevel', { required: 'Club level is required' })}
              error={errors.clubLevel?.message}
            />
            <InputField
              id="clubName"
              label="Club Name"
              register={register('clubName', { required: 'Club name is required' })}
              error={errors.clubName?.message}
            />
            <InputField
              id="date"
              label="Date"
              type="date"
              register={register('date', { required: 'Date is required' })}
              error={errors.date?.message}
            />
            <InputField
              id="day"
              label="Day"
              register={register('day', { required: 'Day is required' })}
              error={errors.day?.message}
            />
            <InputField
              id="startTime"
              label="Start Time"
              type="time"
              register={register('startTime', { required: 'Start time is required' })}
              error={errors.startTime?.message}
            />
            <InputField
              id="endTime"
              label="End Time"
              type="time"
              register={register('endTime', { required: 'End time is required' })}
              error={errors.endTime?.message}
            />
            <InputField
              id="playerQuantity"
              label="Player Quantity"
              type="number"
              register={register('playerQuantity', { required: 'Player quantity is required' })}
              error={errors.playerQuantity?.message}
            />
            <InputField
              id="fieldLocation"
              label="Field Location"
              register={register('fieldLocation', { required: 'Field location is required' })}
              error={errors.fieldLocation?.message}
            />
            <InputField
              id="matchCost"
              label="Match Cost"
              type="number"
              register={register('matchCost', { required: 'Match cost is required' })}
              error={errors.matchCost?.message}
            />
          </>
        )}

        <Button type="submit">경기등록하기</Button>
      </form>
    </FormContainer>
  );
}

export default MercenaryEnrollForm;
