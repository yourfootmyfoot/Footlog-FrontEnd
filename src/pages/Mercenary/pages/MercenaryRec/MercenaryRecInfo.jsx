import style from './MercenaryRecInfo.module.css'


function MercenaryRecInfo({ mercenary: rec }) {  // props 이름 수정

    return (
        <>
            <div className={style.matchContainer}>

                <h4>팀 이름 : {rec.teamName}</h4>
                <h4>팀 실력 : {rec.teamLevel}</h4>
                <h4>지역 / 구장 명 : {rec.region} / {rec.stadiumName}</h4>
                <h4>매치 일정 : {rec.matchSchedule.date}-{rec.matchSchedule.day}</h4>
                <h4>경기 시간 : {rec.matchSchedule.startTime}~{rec.matchSchedule.endTime}</h4>
                <h4>모집 인원 : {rec.recruitmentCount}</h4>
                <h4>원 구장비 / 용병 청구 비용 : {rec.stadiumFee} / {rec.mercenaryFee}</h4>
                <h4>한 줄 소개 : {rec.introduce}</h4>
                <h4>메세지</h4>

            </div>
        </>
    );
}

export default MercenaryRecInfo;