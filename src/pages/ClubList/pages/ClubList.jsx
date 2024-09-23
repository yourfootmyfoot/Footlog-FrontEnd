import { useState, useEffect } from 'react';
import { getClubList } from '../apis/ClubAPI';
import ClubInfo from './ClubInfo';
import club from './ClubList.module.css';
import RegistClubButton from '@/pages/Club/components/RegistClubButton';
import styled from '@emotion/styled';

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

  const MatchContainer = styled.div`
  width: 100%;
  padding: 2vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

  return (
    <>
      <MatchContainer>
        <div className={club.container}>
          {clubList.map(club =>
            <ClubInfo
              key={club.clubCode}
              club={club}
            />
          )}
        </div>
        <RegistClubButton />
      </MatchContainer>
    </>
  )


}

export default ClubList;