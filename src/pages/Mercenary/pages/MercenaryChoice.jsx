import { useHistory } from 'react-router-dom';
import styles from './MercenaryChoice.module.css';  // 수정된 경로

// 이벤트 핸들러
const MercenaryChoice = () => {
  const history = useHistory();

  // 용병 합니다.
  const goMercenaryAppList = () => {
    history.push('/MercenaryAppList');
  };

  // 용병 구해요
  const goMercenaryRecList = () => {
    history.push('/MercenaryRecList');
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