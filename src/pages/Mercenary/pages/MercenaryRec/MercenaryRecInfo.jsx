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
      <div className={recStyle.section} style={{ display: 'flex' }}>
        <div>
          <div className={recStyle.infoRow}>
            <span className={recStyle.label}>구단 이름</span>
          </div>
          <div className={recStyle.infoRow}>
            <span className={recStyle.label}>매치 일정</span>
          </div>
          <div className={recStyle.infoRow}>
            <span className={recStyle.label}>시간</span>
          </div>
          <div className={recStyle.infoRow}>
            <span className={recStyle.label}>지역</span>
          </div>
        </div>

        <div style={{ marginLeft: '0px' }}>
          <div className={recStyle.infoRow}>
            <span>{recruitment.club?.name || '구단명 없음'}</span>
          </div>
          <div className={recStyle.infoRow}>
            <div>{date}</div>
          </div>
          <div className={recStyle.infoRow}>
            <div>{time}</div>
          </div>
          <div className={recStyle.infoRow}>
            <span>{recruitment.location || '장소 미정'}</span>
          </div>
        </div>
      </div>

      <hr className={recStyle.divider} />

      <div className={recStyle.section}>
        <div className={recStyle.infoRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
          <span>필요 인원</span>
          <span>용병비</span>
          <span>필요 포지션</span>
        </div>
        <div className={recStyle.infoRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{recruitment.requiredNumber}명</span>
          <span>{recruitment.pay}원</span>
          <span>{recruitment.requiredPositions.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}

export default MercenaryRecInfo;
