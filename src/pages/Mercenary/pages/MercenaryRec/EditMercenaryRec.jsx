import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function EditMercenaryRec() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchRecruitment = async () => {
      try {
        const data = await getMercenaryRecDetail(id);
        // 폼 필드 초기값 설정
        Object.keys(data).forEach(key => {
          setValue(key, data[key]);
        });
      } catch (error) {
        alert('데이터를 불러오는데 실패했습니다.');
        navigate(-1);
      }
    };

    fetchRecruitment();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateMercenaryRec(id, data);
      alert('수정이 완료되었습니다.');
      navigate(`/mercenary/recruitment/${id}`);
    } catch (error) {
      alert('수정에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* EnrollMercenaryRec의 폼 필드들과 동일한 구조 */}
    </form>
  );
}

export default EditMercenaryRec; 