import appStyle from './MercenaryAppInfo.module.css'
import styles from '../MercenaryChoice.module.css'


function MercenaryAppInfo({ mercenary: app }) {  // props : 별칭

    return (
        <>
            <div className={appStyle.container} >

                <h4>날짜 : {app.schedule.date} - {app.schedule.day}</h4>
                <h4>활동 가능 시간 : {app.schedule.startTime} ~ {app.schedule.endTime}</h4>
                <h4>나이 : {app.age}</h4>
                <h4>활동 가능한 지역 : {app.location}</h4>
                <h4>자기소개 : {app.selfIntroduction}</h4>

                <div style={{ textAlign: 'center' }}>
                    <button className={styles.buttonStyle} >
                        메세지
                    </button>
                </div>
            </div>
        </>
    );
}

export default MercenaryAppInfo;