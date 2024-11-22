import recStyle from './MercenaryRecInfo.module.css';
// import styles from '../MercenaryChoice.module.css';
import { useNavigate } from 'react-router-dom';

function MercenaryRecInfo({ recruitment }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mercenary/recruitment/${recruitment.id}`);
  };

  if (!recruitment) {
    return <div>로딩 중...</div>;
  }

  const formatDateTime = () => {
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

  const { date, time } = formatDateTime();

  return (
    <div className={recStyle.container} onClick={handleClick}>
      <div className={recStyle.section}>
        <h2 className="text-xl font-bold mb-3 text-gray-800">{recruitment.title}</h2>
        <div className="flex items-center mb-3">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-lg font-semibold text-gray-800">{recruitment.club?.clubName || '구단명 없음'}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-600">{date}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">{time}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-600">{recruitment.location || '장소 미정'}</span>
          </div>
        </div>
      </div>

      <div className={recStyle.section}>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">필요 인원</div>
            <div className="font-semibold text-gray-800">{recruitment.requiredNumber}명</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">용병비</div>
            <div className="font-semibold text-gray-800">{recruitment.pay}원</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">포지션</div>
            <div className="font-semibold text-gray-800">{recruitment.requiredPositions.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MercenaryRecInfo;
