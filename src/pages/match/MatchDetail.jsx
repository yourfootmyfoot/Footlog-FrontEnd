// import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMatchDetail } from './apis/MatchAPI';
import matchStyle from "./Match.module.css";




function MatchDetail() {

    const matchCode = 1;
    // const {matchCode} = useParams;

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

    useEffect( // API 요청해서 state에 셋을 한다.
        () => {
            const a = setMatch(getMatchDetail(matchCode));
            console.log(a);
        },
        []
    );

    const slides = match.myClub.preSet;

    return (
        <>{/*https://apis.map.kakao.com/web/guide/  - 카카오맵 api 사용하는 방법*/}
            <div className={matchStyle.MatchBox}>
                <h3>{match.myClub.clubName}와(과){match.enemyClub.clubName}의 경기</h3>
                <img src={match.matchPhoto} alt={`Image${matchCode}`} />

                <h3>{match.myClub.clubName}의 매치 설명</h3>
                <div className={matchStyle.matchDescription}>
                    <p>{match.matchIntroduce}</p>
                </div>
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
                        <li><h3>성별:   {match.gender}</h3></li>
                    </ul>
                </div>

                <h3>{match.myClub.clubName}의 라인업</h3>

                <div>
                    <ImageSlider slides={slides} />
                </div>
                <button>참가하기</button>

            </div>
        </>
    );
}

export default MatchDetail;