import recStyle from './MercenaryRecInfo.module.css';
// import styles from '../MercenaryChoice.module.css';

function MercenaryRecInfo({ mercenary: rec }) {  // props : 별칭
    return (
        <div className={recStyle.container}>
            {/* 상단 정보 */}
            <div className={recStyle.section} style={{ display: 'flex' }}>
                {/* 라벨 부분 */}
                <div>

                    <div className={recStyle.infoRow}>
                        <span className={recStyle.label}>구단 이름</span>
                    </div>

                    <div className={recStyle.infoRow}>
                        <span className={recStyle.label}>매치 일정</span>
                    </div>

                    {/* 빈 줄 추가 */}
                    <span className={recStyle.emptyRow}></span>

                    <div className={recStyle.infoRow}>
                        <span className={recStyle.label}>지역</span>
                    </div>

                    <div className={recStyle.infoRow}>
                        <span className={recStyle.label}>종목</span>
                    </div>

                </div>

                {/* 값 부분 */}
                <div style={{ marginLeft: '0px' }}>

                    <div className={recStyle.infoRow}>
                        <span>{rec.teamName}</span>
                    </div>

                    <div className={recStyle.infoRow}>
                        <div>
                            <div>{rec.schedule.date} ({rec.schedule.day})</div>
                            <div>{rec.schedule.startTime} ~ {rec.schedule.endTime}</div>
                        </div>
                    </div>

                    <div className={recStyle.infoRow}>
                        <span>{rec.region}</span>
                    </div>

                    <div className={recStyle.infoRow}>
                        <span>풋살</span>
                    </div>
                </div>

            </div>

            <hr className={recStyle.divider} />

            {/* 매치 정보 */}
            <div className={recStyle.section}>
                {/* 키: 매치 방식, 구장비 / 참가비, 실력 */}
                <div className={recStyle.infoRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                    <span>매치 방식</span>
                    <span>구장비 / 참가비</span>
                    <span>실력</span>
                </div>

                {/* 값: 6 vs 6, 구장비/참가비, 팀 실력 */}
                <div className={recStyle.infoRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>6 vs 6</span>
                    <span>{rec.stadiumFee} / {rec.mercenaryFee}</span>
                    <span>{rec.teamLevel}</span>
                </div>
            </div>

            <hr className={recStyle.divider} />

            {/* 한줄 소개 */}
            <div className={recStyle.section}>
                <span className={recStyle.label}>한줄 소개</span><br></br>
                {rec.introduce}

            </div>

            {/* 메시지 버튼 */}
            {/* <div style={{ textAlign: 'center' }}>
                <button className={styles.buttonStyle}>
                    메세지
                </button>
            </div> */}

        </div>
    );
}

export default MercenaryRecInfo;
