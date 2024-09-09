import { useState, useEffect } from 'react';
import { getMercenaryRecList } from '../../apis/MercenaryAPI';
import MercenaryRecInfo from './MercenaryRecInfo';
import Mercenary from './MercenaryRecList.module.css';

function MercenaryRecList() {

  const [mercenaryRecList, setMercenaryRecList] = useState([]);

  useEffect(
    () => {
      // mercenaryRecList 불러오기
      setMercenaryRecList(getMercenaryRecList());
    },
    []
  );

  return (
    <>
      <div>
        <h1>용병 구해요 목록</h1>

        <div className={Mercenary.container}>
          {mercenaryRecList.map(mercenaryRec =>
            <MercenaryRecInfo
              key={mercenaryRec.mercenaryRecCode}
              mercenary={mercenaryRec}
            />
          )}
        </div>
      </div>
    </>
  )


}

export default MercenaryRecList;