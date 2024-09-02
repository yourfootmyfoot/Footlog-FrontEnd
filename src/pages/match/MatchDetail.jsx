import { useState, useEffect } from 'react';
import { getMatchDetail } from './apis/MatchAPI';
import matchStyle from "./Match.module.css";
import ImageSlider from './ImageSlider';

function MatchDetail() {
    const matchCode = 1; // 고정된 matchCode 값 (필요에 따라 useParams를 사용해 URL에서 가져올 수 있음)
    // const { matchCode } = useParams(); // URL 파라미터에서 matchCode를 가져올 수 있는 코드 (주석 처리됨)

    // 초기 match 상태 설정
    const [match, setMatch] = useState({
        matchCode: matchCode,
        myClub: {},  // 내 클럽 정보
        enemyClub: {},  // 상대 클럽 정보
        matchName: '',  // 경기 이름
        matchPhoto: '',  // 경기 사진
        matchIntroduce: '',  // 경기 소개
        matchSchedule: {},  // 경기 일정
        matchPlayerQuantity: 0,  // 경기 인원
        quarterQuantity: 1,  // 쿼터 수
        fieldLocation: '',  // 경기장 위치
        matchCost: 0,  // 경기 비용
        clubLevel: '',  // 클럽 수준
        pro: 0,  // 선출 수
        gender: ''  // 성별
    });

    // 컴포넌트가 마운트될 때 API 호출을 통해 데이터를 가져옴
    useEffect(() => {
        const fetchMatchDetail = async () => {
            try {
                const matchData = await getMatchDetail(matchCode); // matchCode를 사용해 API에서 데이터를 가져옴
                setMatch(matchData); // 가져온 데이터를 match 상태에 저장
            } catch (error) {
                console.error('Failed to fetch match details:', error); // API 호출 실패 시 오류를 출력
            }
        };

        fetchMatchDetail(); // 비동기 함수 호출
    }, [matchCode]); // matchCode가 변경될 때마다 useEffect가 다시 실행되도록 의존성 배열에 추가


    // 프리셋 라인업 데이터를 가져옴, 데이터가 없을 경우 빈 배열로 설정
    const slides = match.myClub.preSet || [];


    // 슬라이더 컨테이너 스타일
    const containerStyles = {
        width: "500px",
        height: "280px",
        margin: "0 auto"
    };


    return (
        <div className={matchStyle.MatchBox}>
            {/* 경기 정보 */}
            <h3>{match.myClub.clubName}와(과) {match.enemyClub.clubName}의 경기</h3>
            <img src={match.matchPhoto} alt={`Image${matchCode}`} /> {/* 경기 사진 표시 */}

            {/* 매치 설명 */}
            <h3>{match.myClub.clubName}의 매치 설명</h3>
            <div className={matchStyle.matchDescription}>
                <p>{match.matchIntroduce}</p>
            </div>

            {/* 매치 정보 */}
            <h3>매치 정보</h3>
            <div className={matchStyle.MatchInfo}>
                <ul>
                    <li><h3>구단 이름 : {match.myClub.clubName}</h3></li>
                    <li><h3>경기 날짜/시간 : {match.matchSchedule.matchDate} {match.matchSchedule.matchStartTime} ~ {match.matchSchedule.matchEndTime}</h3></li>
                    <li><h3>경기 인원 : {match.matchPlayerQuantity}명</h3></li>
                    <li><h3>쿼터 수 : {match.matchSchedule.matchTime / 30}</h3></li>
                    <li><h3>구장 정보 : {match.fieldLocation}</h3></li>
                    <li><h3>구장 정보-지도ver</h3></li>
                    <li><h3>매치 비용 : {match.matchCost}원</h3></li>
                    <li><h3>구단 실력 : {match.clubLevel}</h3></li>
                    <li><h3>선출 수 : {match.pro}</h3></li>
                    <li><h3>성별: {match.gender}</h3></li>
                </ul>
            </div>

            {/* 클럽 라인업 */}
            <h3>{match.myClub.clubName}의 라인업</h3>
            <div style={containerStyles}>
                <ImageSlider slides={slides} /> {/* 라인업 슬라이더 */}
            </div>

            {/* 참가하기 버튼 */}
            <div>
                <button className={matchStyle.joinButton}>참가하기</button>
            </div>
        </div>
    );
}

export default MatchDetail;
