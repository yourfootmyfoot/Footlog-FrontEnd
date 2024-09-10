import { useState, useEffect } from 'react';
import { getClubList } from '../apis/ClubAPI';
import ClubInfo from './ClubInfo';
import club from './ClubList.module.css';

function ClubList() {

  const [clubList, setClubList] = useState([]);

  useEffect(
    () => {

      const clubList = getClubList();

      console.log(clubList); // 데이터 확인

      setClubList(clubList);
    },
    []
  );

  return (
    <>
      <div>
        <div className={club.container}>
          {clubList.map(club =>
            <ClubInfo
              key={club.clubCode}
              club={club}
            />
          )}
        </div>
      </div>
    </>
  )


}

export default ClubList;