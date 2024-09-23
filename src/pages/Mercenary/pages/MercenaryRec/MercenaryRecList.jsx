import { useState, useEffect } from 'react';
import { getMercenaryRecList } from '../../apis/MercenaryAPI';
import MercenaryRecInfo from './MercenaryRecInfo';
import MercenaryRec from './MercenaryRecList.module.css';
import EnrollMerButton from '../../EnrollMerButton';
import styled from '@emotion/styled';

function MercenaryRecList() {

  const [mercenaryRecList, setMercenaryRecList] = useState([]);

  useEffect(() => {
    const recList = getMercenaryRecList();

    console.log(recList); // 데이터 확인

    setMercenaryRecList(recList);
  }, []);

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
        <div className={MercenaryRec.container}>
          {mercenaryRecList.map(mercenaryRec =>
            <MercenaryRecInfo
              key={mercenaryRec.mercenaryRecCode}
              mercenary={mercenaryRec}
            />
          )}
        </div>
        <EnrollMerButton />
      </ListContainer>
    </>
  )
}

export default MercenaryRecList;