import { useNavigate } from 'react-router-dom';
import styles from './MercenaryChoice.module.css';

const MercenaryChoice = () => {
  const navigate = useNavigate();

  // 용병 합니다.
  const goMercenaryAppList = () => {
    navigate('/MercenaryAppList');
  };

  // 용병 구해요
  const goMercenaryRecList = () => {
    navigate('/MercenaryRecList');
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonStyle} onClick={goMercenaryAppList}>
        용병 할래요 페이지로 이동하기
      </button>

      <button className={styles.buttonStyle} onClick={goMercenaryRecList}>
        용병 구해요 페이지로 이동하기
      </button>
    </div>
  );
};

export default MercenaryChoice;