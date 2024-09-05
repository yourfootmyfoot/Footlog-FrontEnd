// src/pages/Match/MatchDetail.jsx

import { useState, useEffect } from 'react';
import { getMatchDetail } from './apis/MatchAPI';
import styled from '@emotion/styled';
import ImageSlider from './ImageSlider';

// 매치 정보의 스타일 정의
const MatchBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 2vw;
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

const InfoItem = ({ label, value }) => (
  <li>
    <h3>{label}: {value}</h3>
  </li>
);

const MatchDetail = () => {
  const matchCode = 1;

  const [match, setMatch] = useState({
    matchCode: matchCode,
    myClub: {},
    enemyClub: {},
    matchName: '',
    matchPhoto: '',
    matchIntroduce: '',
    matchSchedule: {},
    matchPlayerQuantity: 0,
    quarterQuantity: 1,
    fieldLocation: '',
    matchCost: 0,
    clubLevel: '',
    pro: 0,
    gender: ''
  });

  // 지도의 중심 좌표 상태 관리. 초기값은 null로 설정
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    // 매치 세부 정보를 가져오는 함수
    const fetchMatchDetail = async () => {
      try {
        const matchData = await getMatchDetail(matchCode);
        setMatch(matchData);
      } catch (error) {
        console.error('Failed to fetch match details:', error);
      }
    };

    fetchMatchDetail();
  }, [matchCode]);

  useEffect(() => {
    // 사용자의 현재 위치를 가져오는 함수
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude }); // 사용자의 현재 위치로 설정
        },
        (error) => {
          console.error('Error getting location:', error);
          setMapCenter({ lat: 33.5563, lng: 126.79581 }); // 위치 정보를 가져오지 못했을 경우 기본값 사용
        }
      );
    } else {
      setMapCenter({ lat: 33.5563, lng: 126.79581 }); // 브라우저에서 위치 정보 사용 불가 시 기본값 사용
    }
  }, []);

  useEffect(() => {
    if (!mapCenter) return; // mapCenter가 설정되지 않았다면 지도 초기화를 하지 않음

    // Kakao 지도 API 스크립트를 동적으로 추가하는 함수
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.type = 'text/javascript';
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_REACT_APP_KAKAOMAP_KEY}&autoload=false`;
    kakaoMapScript.async = true;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
          level: 3
        };

        // 지도를 설정된 좌표로 초기화
        const map = new window.kakao.maps.Map(container, options);

        // mapCenter 상태가 변경될 때마다 지도의 중심을 업데이트
        map.setCenter(new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng));
      });
    };

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, [mapCenter]);

  const slides = match.myClub.preSet || [];
  const containerStyles = { width: "100%", height: "280px", margin: "0 auto" };

  return (
    <MatchBox>
      <h3>{match.myClub.clubName}와(과) {match.enemyClub.clubName}의 경기</h3>
      <img src={match.matchPhoto} alt={`Image${matchCode}`} style={{ width: '100%', borderRadius: '10px' }} />

      <h3>{match.myClub.clubName}의 매치 설명</h3>
      <MatchDescription>
        <p>{match.matchIntroduce}</p>
      </MatchDescription>

      <h3>매치 정보</h3>
      <MatchInfo>
        <ul>
          <InfoItem label="구단 이름" value={match.myClub.clubName} />
          <InfoItem label="경기 날짜/시간" value={`${match.matchSchedule.matchDate} ${match.matchSchedule.matchStartTime} ~ ${match.matchSchedule.matchEndTime}`} />
          <InfoItem label="경기 인원" value={`${match.matchPlayerQuantity}명`} />
          <InfoItem label="쿼터 수" value={match.matchSchedule.matchTime / 30} />
          <InfoItem label="구장 정보" value={match.fieldLocation} />
          <li>
            <MapContainer>
              {mapCenter && ( // mapCenter가 null이 아닐 때에만 지도를 렌더링
                <div id="map" style={{ width: '100%', height: '100%' }}></div>
              )}
            </MapContainer>
          </li>
          <InfoItem label="매치 비용" value={`${match.matchCost}원`} />
          <InfoItem label="구단 실력" value={match.clubLevel} />
          <InfoItem label="선출 수" value={match.pro} />
          <InfoItem label="성별" value={match.gender} />
        </ul>
      </MatchInfo>

      <h3>{match.myClub.clubName}의 라인업</h3>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>

      <JoinButton>참가하기</JoinButton>
    </MatchBox>
  );
};

export default MatchDetail;
