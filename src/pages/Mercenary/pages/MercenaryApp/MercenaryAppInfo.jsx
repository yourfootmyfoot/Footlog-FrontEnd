import MAStyle from './MercenaryAppInfo.module.css'


function MercenaryAppInfo({ mercenary: mercenaryApp }) {  // props 이름 수정

    return (
        <>
            <div className={MAStyle.matchContainer}>

                <h4>날짜 : {mercenaryApp.schedule.date} - {mercenaryApp.schedule.day}</h4>
                <h4>활동 가능 시간 : {mercenaryApp.schedule.startTime} ~ {mercenaryApp.schedule.endTime}</h4>
                <h4>나이 : {mercenaryApp.age}</h4>
                <h4>활동 가능한 지역 : {mercenaryApp.location}</h4>
                <h4>자기소개 : {mercenaryApp.selfIntroduction}</h4>
                <h4>메세지</h4>

            </div>
        </>
    );
}

export default MercenaryAppInfo;