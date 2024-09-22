import { useState, useEffect } from 'react';
import { getMercenaryRecList } from '../../apis/MercenaryAPI';
import MercenaryRecInfo from './MercenaryRecInfo';
import MercenaryRec from './MercenaryRecList.module.css';
import EnrollMerButton from '../../EnrollMerButton';

function MercenaryRecList() {

  const [mercenaryRecList, setMercenaryRecList] = useState([]);

  useEffect(() => {
    const recList = getMercenaryRecList();

    console.log(recList); // 데이터 확인

    setMercenaryRecList(recList);
  }, []);

  return (
    <>
      <div>
        <div className={MercenaryRec.container}>
          {mercenaryRecList.map(mercenaryRec =>
            <MercenaryRecInfo
              key={mercenaryRec.mercenaryRecCode}
              mercenary={mercenaryRec}
            />
          )}
        </div>
        <EnrollMerButton/>
      </div>
    </>
  )


}

export default MercenaryRecList;