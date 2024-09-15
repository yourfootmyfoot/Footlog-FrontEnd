import appStyle from './MercenaryAppInfo.module.css';
// import styles from '../MercenaryChoice.module.css';

function MercenaryAppInfo({ mercenary: app }) {  // props : 별칭
    return (
        <div className={appStyle.container}>
            {/* 상단 정보 */}
            <div className={appStyle.section} style={{ display: 'flex' }}>
                {/* 라벨 부분 */}
                <div>

                    <div className={appStyle.infoRow}>
                        <span className={appStyle.label}>매치 날짜</span>
                    </div>

                    <div className={appStyle.infoRow}>
                        <span className={appStyle.label}>시간</span>
                    </div>

                    <div className={appStyle.infoRow}>
                        <span className={appStyle.label}>나이</span>
                    </div>

                    <div className={appStyle.infoRow}>
                        <span className={appStyle.label}>지역</span>
                    </div>

                </div>

                {/* 값 부분 */}
                <div style={{ marginLeft: '0px' }}>

                    <div className={appStyle.infoRow}>
                        <span>{app.schedule.date} ({app.schedule.day})</span>
                    </div>

                    <div className={appStyle.infoRow}>
                        <div>
                            <div>{app.schedule.startTime} ~ {app.schedule.endTime}</div>
                        </div>
                    </div>

                    <div className={appStyle.infoRow}>
                        <span>{app.age}</span>
                    </div>

                    <div className={appStyle.infoRow}>
                        <span>{app.location}</span>
                    </div>
                </div>

            </div>

            <hr className={appStyle.divider} />

            <div className={appStyle.infoRow}>
                <span className={appStyle.label}>자기소개</span>
            </div>

            <div className={appStyle.infoRow}>
                <span>{app.selfIntroduction}</span>
            </div>

            {/* 메시지 버튼 (주석 처리, 필요시 사용) */}
            {/* <div style={{ textAlign: 'center' }}>
                <button className={app.Styles.buttonStyle}>
                    메세지
                </button>
            </div> */}

        </div>
    );
}

export default MercenaryAppInfo;
