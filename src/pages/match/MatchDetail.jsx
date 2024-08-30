import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MatchDetail() {

    const { matchCode } = useParams();

    const [match, setMatch] = useState({
        myClub: '',
        enemyClub: '',
        matchName: '',
        matchPhoto: '',
        matchIntroduce: '',
        matchSchedule: '',
        matchPlayerQuantity: '',
        quarterQuantity: '',
        fieldLocation: '',
        matchCost: '',
        clubLevel: '',
        pro: [],
        gender: ''
    });

    useEffect( // API 요청해서 state에 셋을 한다.
        () => {
            setMatch(getMatchDetail(matchCode));
        },
        []
    );

    return (
        <>
            <h2>매치 상세 설명</h2>
            
            <h3>{match.club.clubName}</h3>
            {match.matchPhoto}
            <h3>{match.myClub.clubName}의 매치 설명</h3>
            <p>{match.matchIntroduce}</p>
            <h2>매치 정보</h2>
            <h3>구단 이름 : {match.myClub.clubName}</h3>
            <h3>경기 날짜/시간 : {match.matchSchedule.matchDate} {match.matchSchedule.matchStartTime} ~ {match.matchSchedule.matchEndTime}</h3>
            <h3>경기 인원 : {match.matchPlayerQuantity} : {match.matchPlayerQuantity}</h3>
            <h3>쿼터 수 : {match.quarterQuantity}</h3>
            <h3> 구장 정보 : {match.fieldLocation}</h3>
            {match.fieldLocationMap}
            <h3>매치 비용 : {match.matchCost}</h3>
            <h3>구단 실력 : {match.clubLevel}</h3>
            <h3>구단 실력 : {match.pro.proQuantity}</h3>
            <h3>성별:   {match.gender}</h3>


        </>
    )
}