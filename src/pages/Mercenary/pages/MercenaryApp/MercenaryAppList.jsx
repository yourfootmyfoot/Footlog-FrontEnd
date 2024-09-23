import { useState, useEffect } from 'react';
import { getMercenaryAppList } from '../../apis/MercenaryAPI';
import MercenaryAppInfo from './MercenaryAppInfo';
import Mercenary from './MercenaryAppList.module.css';
import EnrollMerButton from '../../EnrollMerButton';
import styled from '@emotion/styled';

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

  const ListContainer = styled.div`
  width: 100%;
  padding: 2vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  `;

  return (
    <>
      <ListContainer>
        <div className={Mercenary.container}>
          {mercenaryAppList.map(mercenaryApp =>
            <MercenaryAppInfo
              key={mercenaryApp.mercenaryAppCode}
              mercenary={mercenaryApp}
            />
          )}
        </div >
        <EnrollMerButton />
      </ListContainer>
    </>
  )


}

export default MercenaryAppList;