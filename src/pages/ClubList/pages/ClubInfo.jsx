import clubStyle from './ClubInfo.module.css';

function ClubInfo({ club:club }) {
  const statusClass =
    club.clubStatus === '모집 완료' ? clubStyle.statusClosed : clubStyle.statusOpen;

  return (
    <div className={clubStyle.container}>
      <img src={club.logo} alt={club.name} className={clubStyle.logo} />
      <div className={clubStyle.details}>
        <div className={clubStyle.header}>
          <span className={clubStyle.clubName}>{club.name}</span>
          <span className={clubStyle.playerQuantity}>👥 {club.playerQuantity}</span>
          <span className={`${clubStyle.clubStatus} ${statusClass}`}>
            {club.clubStatus}
          </span>
        </div>
        <div className={clubStyle.subInfo}>
          <span>{club.location} * {club.stadium}</span>
          <span>{club.gender} * {club.type} * {club.age}</span>
          <span>{club.activityTime} * {club.level}</span>
        </div>
      </div>
    </div>
  );
}

export default ClubInfo;
