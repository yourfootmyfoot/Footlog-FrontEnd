import { useState, useEffect } from 'react';
import { getMercenaryAppList } from '../../apis/MercenaryAPI';
import MercenaryAppInfo from './MercenaryAppInfo';
import Mercenary from './MercenaryAppList.module.css';

function MercenaryAppList() {

  const [mercenaryAppList, setMercenaryAppList] = useState([]);

  useEffect(
    () => {

      const appList = getMercenaryAppList();

      console.log(appList); // 데이터 확인

      setMercenaryAppList(appList);
    },
    []
  );

  return (
    <>
      <div>
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