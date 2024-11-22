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

// API 함수 추가
const getMyApplicationStatus = async (recruitmentId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:8080/api/guest-recruitments/applications/my`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      return null;
    }
    
    const applications = await response.json();
    // 현재 모집글에 대한 신청 찾기
    const currentApplication = applications.find(app => app.recruitmentId === parseInt(recruitmentId));
    return currentApplication ? currentApplication.status : null;
  } catch (error) {
    console.error('Error checking application status:', error);
    return null;
  }
};

function MercenaryRecDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [recruitment, setRecruitment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(null);

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
        setRecruitment(response);
        
        // 내 신청 상태 확인
        const status = await getMyApplicationStatus(id);
        setApplicationStatus(status);
        
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

const isAuthor = userId && String(userId) === String(recruitment.matchEnrollUserId || recruitment.userId);
  const isClubMember = recruitment.club?.members?.includes(userId);

  const handleEdit = () => {
    navigate(`/mercenary/recruitment/edit/${id}`);
  };

  const handleApply = async () => {
    try {
      const response = await applyForRecruitment(id);
      setApplicationStatus(response.status);
      alert('신청이 완료되었습니다.');
    } catch (error) {
      alert('신청에 실패했습니다.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const { date, time } = formatDateTime(recruitment);

  const renderActionButton = () => {
    if (isAuthor) {
      return (
        <button 
          onClick={handleEdit}
          className="px-4 py-2 bg-[rgba(22,199,154,0.3)] text-[#16C79A] rounded-[12px] hover:bg-[rgba(22,199,154,0.4)] transition-colors w-[160px]"
        >
          수정하기
        </button>
      );
    }

    if (!isAuthor && !isClubMember) {
      switch (applicationStatus) {
        case 'PENDING':
          return (
            <button 
              disabled
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-[12px] w-[160px] cursor-not-allowed"
            >
              신청 대기중
            </button>
          );
        case 'APPROVED':
          return (
            <button 
              disabled
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-[12px] w-[160px] cursor-not-allowed"
            >
              신청 승인됨
            </button>
          );
        case 'REJECTED':
          return (
            <button 
              disabled
              className="px-4 py-2 bg-red-100 text-red-600 rounded-[12px] w-[160px] cursor-not-allowed"
            >
              신청 거절됨
            </button>
          );
        default:
          return (
            <button 
              onClick={handleApply}
              className="px-4 py-2 bg-[rgba(22,199,154,0.3)] text-[#16C79A] rounded-[12px] hover:bg-[rgba(22,199,154,0.4)] transition-colors w-[160px]"
            >
              용병신청하기
            </button>
          );
      }
    }

    return null;
  };

  return (
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <svg className="w-7 h-7 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {recruitment.title}
        </h1>

        <div className="space-y-6">
          {/* 구단 정보 */}
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              구단 정보
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">구단명</span>
                <span className="font-semibold text-gray-800">{recruitment.club?.clubName || '구단명 없음'}</span>
              </div>
            </div>
          </div>

          {/* 매치 정보 */}
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              매치 정보
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
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
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              모집 정보
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
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
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                추가 설명
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{recruitment.description}</p>
              </div>
            </div>
          )}
        </div>


        {/* 하단 버튼 영역 */}
        <div className="flex justify-end items-center gap-[16px] mt-4 px-4">
            <button 
                onClick={handleGoBack}
                className="px-4 py-2 bg-[#6B7684] text-white rounded-[12px] hover:bg-[#566371] transition-colors w-[160px]"
            >
                뒤로가기
            </button>
            {renderActionButton()}
        </div>
      </div>
  );
}

export default MercenaryRecDetail;