import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { postMercenaryEnroll } from './services/Mercenary';
import { FormContainer, Button } from './components/Basic';
import { SelectField, InputField } from './components/FormField';
import { getMatchList } from '../../../Match/apis/MatchAPI';

// 제목 스타일링
const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #16C79A;
  margin-bottom: 2 0px;
`;

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
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({ mode: 'onChange' });

  const [matchList, setMatchList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

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

  const selectedMatchCode = watch('match');

  // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  const convertDateToYYYYMMDD = (dateString) => {
    if (!dateString) return ''; // 날짜가 없을 경우 빈 문자열 반환

    // 이미 YYYY-MM-DD 형식이라면 그대로 반환
    if (dateString.includes('-')) {
      return dateString;
    }

    const [day, month, year] = dateString.split('.');

    // year, month, day 값이 정상적으로 추출되었는지 확인
    if (!year || !month || !day) {
      console.error('Invalid date format:', dateString);
      return '';
    }

    return `20${year}-${month}-${day}`; // '24.09.05' -> '2024-09-05'로 변환
  };

  useEffect(() => {
    if (selectedMatchCode) {
      const match = matchList.find(match => match.matchCode === parseInt(selectedMatchCode));
      setSelectedMatch(match || null);

      if (match) {
        // 각 필드에 매치 정보를 자동으로 입력하고 수정하지 못하도록 설정
        setValue('clubLevel', match.clubLevel);
        setValue('clubName', match.myClub.clubName);
        setValue('date', convertDateToYYYYMMDD(match.schedule.date)); // 날짜 변환 후 설정
        setValue('day', match.schedule.day);
        setValue('startTime', match.schedule.startTime);
        setValue('endTime', match.schedule.endTime);
        setValue('playerQuantity', match.playerQuantity);
        setValue('fieldLocation', match.fieldLocation);
        setValue('matchCost', match.matchCost);
      }
    }
  }, [selectedMatchCode, matchList, setValue]);

  return (
    <FormContainer>
      <Title>용병 모집</Title> {/* 가운데 정렬되고 강조된 제목 */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectField
          label="경기 선택"    
          matchList={matchList}
          register={register('match', {
            required: '경기를 선택해주세요',
          })}
          error={errors.match?.message}
        />

        {/* 사용자는 이 필드를 수정할 수 없도록 disabled=true 적용 */}
        <InputField
          id="clubLevel"
          label="구단 실력"
          register={register('clubLevel')}
          error={errors.clubLevel?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="clubName"
          label="구단 이름"
          register={register('clubName')}
          error={errors.clubName?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="date"
          label="경기 일자"
          type="date"
          register={register('date')}
          error={errors.date?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="day"
          label="요일"
          register={register('day')}
          error={errors.day?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="startTime"
          label="시작 시간"
          type="time"
          register={register('startTime')}
          error={errors.startTime?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="endTime"
          label="종료 시간"
          type="time"
          register={register('endTime')}
          error={errors.endTime?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="playerQuantity"
          label="경기 인원"
          type="number"
          register={register('playerQuantity')}
          error={errors.playerQuantity?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="fieldLocation"
          label="구장 위치"
          register={register('fieldLocation')}
          error={errors.fieldLocation?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />
        <InputField
          id="matchCost"
          label="참가비"
          type="number"
          register={register('matchCost')}
          error={errors.matchCost?.message}
          disabled={true} // 사용자가 수정하지 못하게 설정
        />

        <Button type="submit">경기 등록하기</Button>
      </form>
    </FormContainer>
  );
}

export default MercenaryEnrollForm;
