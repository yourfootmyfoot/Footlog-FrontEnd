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
      <div className="space-y-4">
        {/* 구단 정보 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            구단 정보
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">구단명</span>
              <span className="font-semibold text-gray-800">{recruitment.club?.name || '구단명 없음'}</span>
            </div>
          </div>
        </div>

        {/* 매치 정보 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            매치 정보
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">일정</span>
              <span className="font-semibold text-gray-800">{date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">시간</span>
              <span className="font-semibold text-gray-800">{time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">장소</span>
              <span className="font-semibold text-gray-800">{recruitment.location || '장소 미정'}</span>
            </div>
          </div>
        </div>

        {/* 모집 정보 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            모집 정보
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">필요 인원</span>
              <span className="font-semibold text-gray-800">{recruitment.requiredNumber}명</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">용병비</span>
              <span className="font-semibold text-gray-800">{recruitment.pay.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">포지션</span>
              <span className="font-semibold text-gray-800">
                {recruitment.requiredPositions?.join(', ') || '제한없음'}
              </span>
            </div>
          </div>
        </div>

        {/* 추가 설명 */}
        {recruitment.description && (
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              추가 설명
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-gray-700 whitespace-pre-wrap">{recruitment.description}</p>
            </div>
          </div>
        )}

        {/* 하단 버튼 영역 */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={handleGoBack}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            뒤로가기
          </button>

          {isAuthor ? (
            <button 
              onClick={handleEdit}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              수정하기
            </button>
          ) : !isAuthor && !isClubMember && (
            <button 
              onClick={handleApply}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              용병신청하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MercenaryRecDetail;