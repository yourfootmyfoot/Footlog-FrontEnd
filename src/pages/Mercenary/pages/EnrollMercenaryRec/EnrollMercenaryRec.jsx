import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postMercenaryEnroll } from './services/Mercenary';
import { getMyClubList } from '../../services/club';
import { FormContainer, Title, ErrorMessage, Button } from './components/Basic';
import { InputField, SelectField, ObjectSelectField, TimeRangeSelect, TextAreaField } from './components/FormField';

function MercenaryEnrollForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [clubList, setClubList] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchMyClubList = async () => {
      const result = await getMyClubList();
      setClubList(result);
    };
    fetchMyClubList();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (!data.date || !data.timeStart || !data.timeEnd) {
        throw new Error('날짜와 시간을 모두 입력해주세요.');
      }

      const formData = {
        title: data.title,
        userId: parseInt(localStorage.getItem('userId')),
        clubId: parseInt(data.myClub),
        matchDate: data.date,
        matchStartTime: data.timeStart,
        matchEndTime: data.timeEnd,
        location: data.location,
        requiredNumber: parseInt(data.requiredNumber),
        requiredPositions: data.positions,
        pay: parseInt(data.pay),
        description: data.description || ''
      };

      console.log('서버로 전송되는 데이터:', formData);
      await postMercenaryEnroll(formData);
      alert('모집글이 등록되었습니다.');
      navigate('/mercenary/rec-list');
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <FormContainer>
      <Title>용병 모집</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="title"
          label="모집글 제목"
          type="text"
          register={register('title', {
            required: '제목을 입력해주세요',
            maxLength: {
              value: 50,
              message: '제목은 50자 이내로 입력해주세요'
            }
          })}
          error={errors.title?.message}
        />
        
        {clubList === null ? (
          <ErrorMessage>가입한 구단 정보가 없습니다</ErrorMessage>
        ) : (
          <ObjectSelectField
            id="myClub"
            label="내 구단정보"
            options={clubList}
            register={register('myClub', {
              required: '구단을 선택해주세요.',
            })}
            error={errors.myClub?.message}
          />
        )}

        <InputField
          id="date"
          label="경기 날짜"
          type="date"
          register={register('date', {
            required: '경기 날짜를 선택해주세요'
          })}
          error={errors.date?.message}
        />

        <TimeRangeSelect
          id="timeStart"
          endId="timeEnd"
          label="경기 시간"
          register={register('timeStart', {
            required: '시작 시간을 선택해주세요',
            validate: (value) => {
              if (!value) return '시작 시간을 선택해주세요';
              return true;
            }
          })}
          endRegister={register('timeEnd', {
            required: '종료 시간을 선택해주세요',
            validate: (value) => {
              if (!value) return '종료 시간을 선택해주세요';
              return true;
            }
          })}
          error={errors.timeStart?.message}
          endError={errors.timeEnd?.message}
        />

        <InputField
          id="location"
          label="경기 장소"
          type="text"
          register={register('location', {
            required: '경기 장소를 입력해주세요'
          })}
          error={errors.location?.message}
        />

        <InputField
          id="requiredNumber"
          label="필요 인원"
          type="number"
          register={register('requiredNumber', {
            required: '필요 인원을 입력해주세요',
            min: { value: 1, message: '최소 1명 이상이어야 합니다' }
          })}
          error={errors.requiredNumber?.message}
        />

        <SelectField
          id="positions"
          label="필요 포지션"
          multiple={true}
          register={register('positions', {
            required: '필요 포지션을 선택해주세요'
          })}
          options={[
            { value: 'ST', label: '공격수' },
            { value: 'RW', label: '오른쪽 윙어' },
            { value: 'LW', label: '왼쪽 윙어' },
            { value: 'CM', label: '중앙 미드필더' },
            { value: 'LB', label: '왼쪽 수비수' },
            { value: 'CB', label: '중앙 수비수' },
            { value: 'RB', label: '오른쪽 수비수' },
            { value: 'GK', label: '골키퍼' }
          ]}
          error={errors.positions?.message}
        />

        <InputField
          id="pay"
          label="용병비"
          type="number"
          step="1000"
          register={register('pay', {
            required: '용병비를 입력해주세요',
            min: { value: 0, message: '0원 이상이어야 합니다' },
            validate: {
              isThousandUnit: value => value % 1000 === 0 || '1000원 단위로 입력해주세요'
            }
          })}
          error={errors.pay?.message}
        />

        <TextAreaField
          id="description"
          label="추가 설명"
          register={register('description')}
          error={errors.description?.message}
        />

        <Button type="submit">등록하기</Button>
      </form>
    </FormContainer>
  );
}

export default MercenaryEnrollForm;
