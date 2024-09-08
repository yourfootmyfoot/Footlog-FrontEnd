import { useState, useEffect } from 'react';
import { getMercenaryAppList } from '../../apis/MercenaryAPI';
import MercenaryAppInfo from './MercenaryAppInfo';
import Mercenary from './MercenaryAppList.module.css';

function MercenaryAppList() {

  const [mercenaryAppList, setMercenaryAppList] = useState([]);

  useEffect(
    () => {
      // mercenaryAppList 불러오기
      setMercenaryAppList(getMercenaryAppList());
    },
    []
  );

  return (
    <>
      <div>
        <h1>용병 합니다 목록</h1>

        <div className={Mercenary.container}>
          {mercenaryAppList.map(mercenaryApp =>
            <MercenaryAppInfo
              key={mercenaryApp.mercenaryAppCode}
              mercenary={mercenaryApp}
            />
          )}
        </div>
      </div>
    </>
  )


}

export default MercenaryAppList;