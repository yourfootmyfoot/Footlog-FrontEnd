import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../../../stores/userStore';
import recStyle from './MercenaryRecInfo.module.css';
import { getMercenaryRecInfo, applyForRecruitment } from '../../apis/MercenaryAPI';

// formatDateTime 유틸리티 함수
const formatDateTime = (recruitment) => {
  if (!recruitment.matchDate || !recruitment.matchStartTime) {
    return {
      date: '날짜 미정',
      time: '시간 미정'
    };
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  return {
    date: recruitment.matchDate,
    time: `${formatTime(recruitment.matchStartTime)} - ${formatTime(recruitment.matchEndTime)}`
  };
};

function MercenaryRecDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const [recruitment, setRecruitment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecruitmentDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          alert('로그인이 필요한 서비스입니다.');
          navigate('/login');
          return;
        }

        const response = await getMercenaryRecInfo(id);
        console.log('Current userId:', userId);
        console.log('Full recruitment data:', response);
        setRecruitment(response);
        setIsLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setIsLoading(false);
        if (err.message === '로그인이 필요한 서비스입니다.') {
          navigate('/login');
        }
      }
    };

    fetchRecruitmentDetail();
  }, [id, navigate]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!recruitment) return <div>데이터를 불러오는데 실패했습니다.</div>;

  const isAuthor = String(userId) === String(recruitment.club?.id);
  const isClubMember = recruitment.club?.members?.includes(userId);

  const handleEdit = () => {
    navigate(`/mercenary/recruitment/edit/${id}`);
  };

  const handleApply = async () => {
    try {
      await applyForRecruitment(id);
      alert('신청이 완료되었습니다.');
    } catch (error) {
      alert('신청에 실패했습니다.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const { date, time } = formatDateTime(recruitment);

  return (
    <div className="max-w-4xl mx-auto p-6 mb-32">
      {/* 구단 정보 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{recruitment.club?.name || '구단명 없음'}</h1>
      </div>

      {/* 매치 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">매치 정보</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">일정</span>
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">시간</span>
              <span className="font-medium">{time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">장소</span>
              <span className="font-medium">{recruitment.location || '장소 미정'}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">모집 정보</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">필요 인원</span>
              <span className="font-medium">{recruitment.requiredNumber}명</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">용병비</span>
              <span className="font-medium">{recruitment.pay.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">포지션</span>
              <span className="font-medium">
                {recruitment.requiredPositions?.join(', ') || '제한없음'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 설명 */}
      {recruitment.description && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-4">추가 설명</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{recruitment.description}</p>
        </div>
      )}

      {/* 하단 버튼 영역 */}
      <div className="flex justify-between items-center mt-8">
        <button 
          onClick={handleGoBack}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md flex items-center gap-2"
        >
          뒤로가기
        </button>

        {isAuthor ? (
          <button 
            onClick={handleEdit}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
          >
            수정하기
          </button>
        ) : !isAuthor && !isClubMember && (
          <button 
            onClick={handleApply}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
          >
            용병신청하기
          </button>
        )}
      </div>
    </div>
  );
}

export default MercenaryRecDetail;