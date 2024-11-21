import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getMercenaryRecDetail, updateMercenaryRec } from '../EnrollMercenaryRec/services/Mercenary';
import { FormContainer, Title, ErrorMessage, Button } from '../EnrollMercenaryRec/components/Basic';
import { 
  InputField, 
  SelectField, 
  TimeRangeSelect, 
  TextAreaField 
} from '../EnrollMercenaryRec/components/FormField';
import styled from '@emotion/styled';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const BackButton = styled(Button)`
  background-color: #718096;
  &:hover {
    background-color: #4a5568;
  }
`;

function EditMercenaryRec() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchRecruitment = async () => {
      try {
        const data = await getMercenaryRecDetail(id);
        setValue('title', data.title);
        setValue('date', data.matchDate);
        
        if (data.matchStartTime) {
          const startTime = data.matchStartTime.substring(0, 5);
          setValue('timeStart', startTime);
        }
        
        if (data.matchEndTime) {
          const endTime = data.matchEndTime.substring(0, 5);
          setValue('timeEnd', endTime);
        }

        setValue('location', data.location);
        setValue('requiredNumber', data.requiredNumber);
        setValue('positions', data.requiredPositions);
        setValue('pay', data.pay);
        setValue('description', data.description);
        
        console.log('Fetched Data:', data);
        console.log('Start Time:', data.matchStartTime);
        console.log('End Time:', data.matchEndTime);
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error:', error);
        navigate(-1);
      }
    };

    fetchRecruitment();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (!data.date || !data.timeStart || !data.timeEnd) {
        throw new Error('날짜와 시간을 모두 입력해주세요.');
      }

      const formData = {
        title: data.title,
        matchDate: data.date,
        matchStartTime: data.timeStart,
        matchEndTime: data.timeEnd,
        location: data.location,
        requiredNumber: parseInt(data.requiredNumber),
        requiredPositions: data.positions,
        pay: parseInt(data.pay),
        description: data.description || ''
      };

      await updateMercenaryRec(id, formData);
      alert('수정이 완료되었습니다.');
      navigate(`/mercenary/recruitment/${id}`);
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message);
      alert(error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <FormContainer>
      <Title>용병 모집글 수정</Title>
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
            required: '시작 시간을 선택해주세요'
          })}
          endRegister={register('timeEnd', {
            required: '종료 시간을 선택해주세요'
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

        <ButtonContainer>
          <BackButton type="button" onClick={handleGoBack}>
            뒤로가기
          </BackButton>
          <Button type="submit">수정하기</Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
}

export default EditMercenaryRec; 