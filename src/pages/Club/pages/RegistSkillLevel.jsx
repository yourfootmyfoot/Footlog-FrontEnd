import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import { useState, useEffect } from 'react';
import useClubStore from '@/hooks/useClubStore';

function RegistSkillLevel() {
    const navigate = useNavigate();
    const { clubName, clubCode, schedule, location, ageGender, skillLevel, setSkillLevel, reset } = useClubStore(); // zustand 상태 불러오기
    const [selectedLevel, setSelectedLevel] = useState(skillLevel.level || ''); // zustand 상태로 초기화
    const [gauge, setGauge] = useState(skillLevel.gauge || 0);

    const levels = ['입문자', '아마추어', '세미프로', '프로', '월드클래스'];
    const descriptions = {
        '입문자': '이제 축구를 시작해 기초부터 배우는 중',
        '아마추어': '축구를 시작한 지 얼마 안 돼 서툰 기본기',
        '세미프로': '일반인 에이스, 안정적인 공격과 수비',
        '프로': '고등학교 이상 또는 대학 선수 실력',
        '월드클래스': '프로 선수 실력'
    };

    useEffect(() => {
        // zustand 상태가 있으면 해당 값으로 초기화
        if (skillLevel.level) {
            setSelectedLevel(skillLevel.level);
            setGauge(skillLevel.gauge);
        }
    }, [skillLevel]);

    const handleLevelClick = (level, gaugeValue) => {
        setSelectedLevel(level);
        setGauge(gaugeValue); // 게이지 상태 업데이트
    };

    const API_URL = 'http://192.168.0.32:8080/api/clubs';

    // 쿠키에서 액세스 토큰 가져오기
    const getAccessTokenFromCookies = () => {
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(row => row.startsWith('accessToken='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    };


    const goBack = () => {
        navigate('/club/regist/age-gender'); // 이전 페이지로 이동
    };

    const handleSubmit = async () => {
        const accessToken = getAccessTokenFromCookies(); // 쿠키에서 액세스 토큰 가져오기
        if (selectedLevel) {
            setSkillLevel(selectedLevel, gauge); // zustand 상태 업데이트

              // 서버로 데이터 전송하기 전에 각 필드 확인
        console.log("Club Name:", clubName);
        console.log("Club Code:", clubCode);
        console.log("Schedule Days:", schedule.days);
        console.log("Schedule Times:", schedule.times);
        console.log("Location Stadium:", location.stadiumName);
        console.log("Location City:", location.city);
        console.log("Location Region:", location.region);
        console.log("Age Group:", ageGender.ageGroup);
        console.log("Gender:", ageGender.gender);
        console.log("Selected Level:", selectedLevel);


            // 서버로 데이터 전송
            const data = {
                clubName,
                clubCode,
                erollDate: new Date().toISOString(), // ISO 8601 형식으로 날짜 전송
                days: schedule.days, // days만 따로 보냄
                times: schedule.times, // times만 따로 보냄
                skillLevel: selectedLevel,  // 사용자가 선택한 실력 등급
                stadiumName: location.stadiumName,  // 구장 이름
                city: location.city,  // 도시
                region: location.region,  // 지역
                ageGroup: ageGender.ageGroup,  // 나이 그룹
                gender: ageGender.gender  // 성별
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data)
                });
                console.log(response)

                if (response.ok) {
                    // 서버에 저장 성공 시 등록 성공 페이지로 이동
                    reset(); // 상태 초기화 (필요시 사용)
                    navigate('/club/regist/success'); // 성공 페이지로 이동
                } else {
                    console.error('서버 오류:', response.statusText);
                    alert('등록에 실패했습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                console.error('요청 실패:', error);
                alert('서버와 통신 중 오류가 발생했습니다.');
            }
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
