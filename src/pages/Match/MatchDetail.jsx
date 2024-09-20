// src/pages/Match/MatchDetail.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getMatchDetail } from './apis/MatchAPI';
import styled from '@emotion/styled';
import ImageSlider from './ImageSlider';


// 매치 정보의 스타일 정의
const MatchBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 2vw; /* 상하 좌우 패딩 */
  margin: auto;
`;

const MatchInfo = styled.div`
  width: 100%;
  margin-top: 2vh;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 1vh;
    font-size: 16px;
  }
`;

const MatchDescription = styled.div`
  width: 100%;
  margin-top: 2vh;
  text-align: center;
  p {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const JoinButton = styled.button`
  background-color: #16c79a;
  color: white;
  border: none;
  padding: 1vh 2vw;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 3vh;

  &:hover {
    background-color: #13a682;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 2vh;
  border-radius: 10px;
  overflow: hidden;
`;

const MatchDetail = () => {
  const { matchCode } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    const fetchMatchDetail = async () => {
      try {
        const matchData = await getMatchDetail(matchCode);
        setMatchInfo(matchData);
      } catch (error) {
        console.error('Failed to fetch match details:', error);
      }
    };

    fetchMatchDetail();
  }, [matchCode]);

  if (!matchInfo) return <div>Loading...</div>;

  //const slides = match.myClub.preSet || [];
  const slides = matchInfo.photo ? [matchInfo.photo] : [];
  console.log(matchInfo)

  return (
    <MatchBox>
      <h3>{matchInfo.myClub.clubName}와(과) {matchInfo.enemyClub.clubName}의 경기</h3>
      <div style={{ width: '100%', height: '280px', margin: '0 auto' }}>
        <ImageSlider slides={slides} />
      </div>

      <h3>{matchInfo.myClub.clubName}의 매치 설명</h3>
      <MatchDescription>
        <p>{matchInfo.introduce}</p>
      </MatchDescription>

      <h3>매치 정보</h3>
      <MatchInfo>
        <ul>
          <li><h3>구단 이름 : {matchInfo.myClub.clubName}</h3></li>
          <li><h3>경기 날짜/시간 : {matchInfo.schedule.date} {matchInfo.schedule.startTime} ~ {matchInfo.schedule.endTime}</h3></li>
          <li><h3>경기 인원 : {matchInfo.playerQuantity}명</h3></li>
          <li><h3>쿼터 수 : {matchInfo.quarterQuantity}</h3></li>
          <li><h3>구장 정보 : {matchInfo.fieldLocation}</h3></li>
          <li>
            <MapContainer>
              <Map
                center={{ lat: matchInfo.coordinates.latitude, lng: matchInfo.coordinates.longitude }}
                style={{ width: '100%', height: '100%' }}
                level={3}
              >
                <MapMarker position={{ lat: matchInfo.coordinates.latitude, lng: matchInfo.coordinates.longitude }} />
              </Map>
            </MapContainer>
          </li>
          <li><h3>매치 비용 : {matchInfo.matchCost}원</h3></li>
          <li><h3>구단 실력 : {matchInfo.clubLevel}</h3></li>
          <li><h3>선출 수 : {matchInfo.pro}</h3></li>
          <li><h3>성별: {matchInfo.gender}</h3></li>
        </ul>
      </MatchInfo>

      <JoinButton>참가하기</JoinButton>
    </MatchBox>
  );
};

export default MatchDetail;