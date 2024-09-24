import clubStyle from './ClubInfo.module.css';


function ClubInfo({ club }) {
  const statusClass =
    club.clubStatus === '모집 완료' ? clubStyle.statusClosed : clubStyle.statusOpen;

  return (
    <div className={clubStyle.container}>
      <img src={club.logo} alt={club.clubName} className={clubStyle.logo} />  {/* logo를 불러와 이미지 렌더링 */}
      <div className={clubStyle.details}>
        <div className={clubStyle.header}>
          <span className={clubStyle.clubName}>{club.clubName}</span>  {/* 클럽 이름 표시 */}
          <span className={clubStyle.playerQuantity}>👥 {club.memberCount}</span>  {/* 구단원 수 표시 */}
          <span className={`${clubStyle.clubStatus} ${statusClass}`}>
            {club.clubStatus}
          </span>
        </div>
        <div className={clubStyle.subInfo}>
          <span>지역 : {club.city} * 홈구장 : {club.stadiumName}</span>  {/* 활동 지역 및 경기장 */}
          <span>성별 : {club.gender} * 연령대 : {club.ageGroup}</span>  {/* 성별, 종목, 연령대 */}
          <span>활동 시간대 : {club.times} * 실력 : {club.skillLevel}</span>  {/* 활동 시간대 및 실력 */}
        </div>
      </div>
    </div>
  );
}

export default ClubInfo;
