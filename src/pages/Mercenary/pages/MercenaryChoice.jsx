import { useHistory } from 'react-router-dom';

const MercenaryChoice = () => {
  const history = useHistory();

  // 용병 합니다.
  const goMercenaryAppList = () => {
    history.push('/MercenaryAppList', {});
  };

  /* // 용병 구해요
  const goMercenaryRecList = () => {
    history.push('/MercenaryRecList', {});
  }; */


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>

      <button onClick={goMercenaryAppList}>용병 할래요 페이지로 이동하기</button>
      {/* <button onClick={goMercenaryRecList}>용병 구해요 페이지로 이동하기</button> */}

    </div>
  );
};

export default MercenaryChoice;