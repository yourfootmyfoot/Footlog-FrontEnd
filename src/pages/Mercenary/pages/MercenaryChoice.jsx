import { useNavigate } from 'react-router-dom';
import styles from './MercenaryChoice.module.css';
import soccerImage from './soccer-image.jpg';

const MercenaryChoice = () => {
  const navigate = useNavigate();

  // 용병 합니다.
  const goMercenaryAppList = () => {
    navigate('/mercenary/app-list');
  };

  // 용병 구해요
  const goMercenaryRecList = () => {
    navigate('/mercenary/rec-list');
  };

  return (
    <div className={styles.buttonContainer}>
      <img src={soccerImage} alt="축구 용병" className={styles.soccerImage} />
      <button className={styles.buttonStyle} onClick={goMercenaryAppList}>
        용병 신청 페이지로 이동하기
      </button>

      <button className={styles.buttonStyle} onClick={goMercenaryRecList}>
        용병 모집 페이지로 이동하기
      </button>
    </div>
  );
};

export default MercenaryChoice;