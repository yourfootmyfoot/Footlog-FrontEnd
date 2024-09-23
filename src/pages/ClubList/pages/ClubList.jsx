import { useState, useEffect } from 'react';
import { getClubList } from '../apis/ClubAPI';
import ClubInfo from './ClubInfo';
import club from './ClubList.module.css';
import RegistClubButton from '@/pages/Club/components/RegistClubButton';
import styled from '@emotion/styled';
import axios from 'axios';

function ClubList() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(
    () => {
          // 로그인 여부 확인 API 호출
          axios.get('http://localhost:8080/api/auth/status', { withCredentials: true })
          .then(response => {
              const data = response.data;
              setIsLoggedIn(data.isLoggedIn);
              setUserInfo({
                  email: data.email,
                  authority: data.authority,
                  name : data.name
              });
              console.log(data);
          })
          .catch(error => {
              console.error("로그인 상태 확인 중 오류 발생:", error);
          });
          


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
          {isLoggedIn && <p>Welcome, {userInfo.email}!</p>}  {/* 로그인된 사용자의 이메일 표시 */}
          {clubList.map(club =>
            <ClubInfo
              key={club.clubCode}
              club={club}
            />
          )}
        </div>
        {isLoggedIn && <RegistClubButton />}  {/* 로그인 상태에 따라 버튼을 렌더링 */}
      </MatchContainer>
    </>
  )


}

export default ClubList;