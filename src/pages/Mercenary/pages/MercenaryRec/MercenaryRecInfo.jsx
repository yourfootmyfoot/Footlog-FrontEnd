import recStyle from './MercenaryRecInfo.module.css';
// import styles from '../MercenaryChoice.module.css';

function MercenaryRecInfo({ recruitment }) {
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = formatDateTime(recruitment.matchDateTime);

  return (
    <div className={recStyle.container}>
      <div className={recStyle.section} style={{ display: 'flex' }}>
        <div>
          <div className={recStyle.infoRow}>
            <span className={recStyle.label}>구단 이름</span>
          </div>
          <div className={recStyle.infoRow}>
            <span className={recStyle.label}>매치 일정</span>
          </div>
          <div className={recStyle.infoRow}>
            <span className={recStyle.label}>지역</span>
          </div>
        </div>

        <div style={{ marginLeft: '0px' }}>
          <div className={recStyle.infoRow}>
            <span>{recruitment.club.name}</span>
          </div>
          <div className={recStyle.infoRow}>
            <div>
              <div>{date}</div>
              <div>{time}</div>
            </div>
          </div>
          <div className={recStyle.infoRow}>
            <span>{recruitment.location}</span>
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

      <hr className={recStyle.divider} />

      <div className={recStyle.section}>
        <span className={recStyle.label}>추가 설명</span><br />
        {recruitment.description}
      </div>
    </div>
  );
}

export default MercenaryRecInfo;
