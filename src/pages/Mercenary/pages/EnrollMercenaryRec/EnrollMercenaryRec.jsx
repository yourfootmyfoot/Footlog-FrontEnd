import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { postMercenaryEnroll } from './services/Mercenary';
import { FormContainer, Button } from './components/Basic';
import { InputField, TimeRangeSelect, SelectField } from './components/FormField';

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #16C79A;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

function MercenaryEnrollForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await postMercenaryEnroll({
        ...data,
        matchDateTime: new Date(`${data.date}T${data.timeStart}`).toISOString(),
        requiredPositions: data.requiredPositions
      });
      
      alert('모집글이 등록되었습니다.');
      navigate(`/mercenary/rec/${response.id}`);
    } catch (error) {
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
          label="경기 시간"
          register={register('timeStart', {
            required: '경기 시간을 선택해주세요'
          })}
          error={errors.timeStart?.message}
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
          id="requiredPositions"
          label="필요 포지션"
          multiple
          register={register('requiredPositions', {
            required: '필요 포지션을 선택해주세요'
          })}
          options={[
            { value: 'FW', label: '공격수' },
            { value: 'MF', label: '미드필더' },
            { value: 'DF', label: '수비수' },
            { value: 'GK', label: '골키퍼' }
          ]}
          error={errors.requiredPositions?.message}
        />

        <InputField
          id="pay"
          label="용병비"
          type="number"
          min={0}
          step={1000}
          placeholder="1000원 단위로 입력해주세요"
          register={register('pay', {
            required: '용병비를 입력해주세요',
            min: { value: 0, message: '0원 이상이어야 합니다' },
            validate: {
              isThousandUnit: value => value % 1000 === 0 || '1000원 단위로 입력해주세요'
            },
            valueAsNumber: true
          })}
          error={errors.pay?.message}
        />

        <InputField
          id="description"
          label="추가 설명"
          type="textarea"
          register={register('description')}
          error={errors.description?.message}
        />

        <Button type="submit">등록하기</Button>
      </form>
    </FormContainer>
  );
}

export default MercenaryEnrollForm;
