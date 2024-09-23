import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import { useState, useEffect } from 'react';
import useClubStore from '@/hooks/useClubStore';

function RegistSkillLevel() {
    const navigate = useNavigate();
    const { clubName, clubCode, schedule, location, ageGender, skillLevel, setSkillLevel, reset } = useClubStore(); // zustand 상태 불러오기
    const [selectedLevel, setSelectedLevel] = useState(skillLevel.level || ''); // 이전 선택한 값 사용
    const [gauge, setGauge] = useState(0); // 게이지 상태를 관리

    const levels = ['입문자', '아마추어', '세미프로', '프로', '월드클래스'];
    const descriptions = {
        '입문자': '이제 축구를 시작해 기초부터 배우는 중',
        '아마추어': '축구를 시작한 지 얼마 안 돼 서툰 기본기',
        '세미프로': '일반인 에이스, 안정적인 공격과 수비',
        '프로': '고등학교 이상 또는 대학 선수 실력',
        '월드클래스': '프로 선수 실력'
    };

    useEffect(() => {
        // 페이지 로드 시 상태가 있으면 해당 값으로 설정
        if (skillLevel.level) {
            setSelectedLevel(skillLevel.level);
            setGauge(skillLevel.gauge);
        }
    }, [skillLevel]);

    const handleLevelClick = (level, gaugeValue) => {
        setSelectedLevel(level);
        setGauge(gaugeValue); // 게이지 상태 업데이트
    };


    const goBack = () => {
        navigate('/club/regist/age-gender'); // 이전 페이지로 이동
    };

    const handleSubmit = () => {
        if (selectedLevel) {
          setSkillLevel(selectedLevel, gauge); // zustand 상태 업데이트
            console.log('구단 이름:', clubName);
            console.log('구단 코드:', clubCode);
            console.log('스케줄:', schedule);
            console.log('위치 정보:', location);
            console.log('나이대 및 성별:', ageGender);
            console.log('실력:', selectedLevel);
            console.log('게이지:', gauge);
    
          // 여기서 서버에 데이터를 전송하거나 추가적인 처리 로직 수행 가능
          reset(); // 상태 초기화
          navigate('/club/success'); // 완료 페이지로 이동
        } else {
            alert('실력을 선택해주세요.');
        }
        };

    return (
        <div className="mt-6 ml-6 mr-6">
            <h2 className="text-lg font-bold">구단 실력을 선택해주세요</h2>
            <p className="text-sm text-muted-foreground">정확하지 않아도 돼요. 나중에 수정할 수 있어요</p>

            <div className="mt-4">
                <div className="flex justify-between">
                    {levels.map((level, index) => (
                        <button
                            key={level}
                            onClick={() => handleLevelClick(level, (index + 1) * 2)} // 게이지 값을 단계별로 설정
                            className={`m-2 p-4 rounded-lg border ${
                                selectedLevel === level
                                    ? 'border-[#16C79A] text-[#16C79A]'
                                    : 'border-primary text-black'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <div className="flex mt-6">
                    {[...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 m-1 ${
                                index < gauge ? 'bg-[#16C79A]' : 'bg-gray-300'
                            }`}
                        ></div>
                    ))}
                </div>

                {/* 선택된 레벨 설명 */}
                {selectedLevel && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <p><strong>{selectedLevel}</strong></p>
                        <p>{descriptions[selectedLevel]}</p>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    className="p-2 rounded-lg w-1/2 mr-2"
                    onClick={goBack}
                    style={{
                        backgroundColor: 'rgb(235, 248, 245)',
                        color: 'rgb(92, 196, 157)',
                    }}
                >
                    뒤로
                </button>
                <button
                    className="p-2 rounded-lg w-1/2 ml-2"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: 'rgb(92, 196, 157)',
                        color: 'rgb(235, 248, 245)',
                    }}
                >
                    등록하기
                </button>
            </div>
        </div>
    );
}

export default RegistSkillLevel;
