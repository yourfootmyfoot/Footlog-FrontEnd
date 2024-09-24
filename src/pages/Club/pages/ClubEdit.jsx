import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useClubStore from '@/hooks/useClubStore';  // Zustand 훅
import styles from './ClubRegist.module.css'; // 외부 CSS 파일로 스타일을 관리.

function ClubEdit() {
    const { clubId } = useParams();  // URL 파라미터에서 clubId 추출
    const navigate = useNavigate();
    const { setClub, setSchedule, setSkillLevel, setLocation } = useClubStore();  // Zustand에서 상태 업데이트 함수 불러오기
    const [clubName, setClubName] = useState('');
    const [clubIntroduction, setClubIntroduction] = useState('');
    const [clubCode, setClubCode] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('');
    const [stadiumName, setStadiumName] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const levels = ['입문자', '아마추어', '세미프로', '프로', '월드클래스'];
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const times = [
        { label: '아침 6~10시', value: '아침' },
        { label: '낮 10~18시', value: '낮' },
        { label: '저녁 18~24시', value: '저녁' },
        { label: '심야 24~6시', value: '심야' }
    ];
    const cities = ['서울', '경기', '인천'];
    const regions = {
        '서울': ['강남구', '서초구', '마포구'],
        '경기': ['성남시', '수원시', '고양시'],
        '인천': ['남동구', '연수구', '부평구'],
    };

    // 클럽 상세 정보를 가져오는 함수
    const fetchClubDetail = async () => {
        try {
            const response = await fetch(`http://192.168.0.32:8080/api/clubs/${clubId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('구단 정보를 가져오지 못했습니다.');
            }

            const data = await response.json();
            setClub(data);  // Zustand 상태에 저장
            setClubName(data.clubName);
            setClubIntroduction(data.clubIntroduction);
            setClubCode(data.clubCode);
            setSelectedDays(data.days);
            setSelectedTimes(data.times);
            setSelectedLevel(data.skillLevel);
            setStadiumName(data.stadiumName);
            setSelectedCity(data.city);
            setSelectedRegion(data.region);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('구단 정보를 가져오는 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClubDetail();
    }, [clubId]);

    // 수정된 구단 정보를 저장하는 함수
    const handleSave = async () => {
        const updatedClub = {
            clubName,
            clubIntroduction,
            clubCode,
            days: selectedDays,
            times: selectedTimes,
            skillLevel: selectedLevel,
            stadiumName,
            city: selectedCity,
            region: selectedRegion
        };

        try {
            const response = await fetch(`http://192.168.0.32:8080/api/clubs/${clubId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedClub),
            });

            if (!response.ok) {
                throw new Error('구단 정보를 수정하는 데 실패했습니다.');
            }

            alert('구단 정보가 성공적으로 수정되었습니다.');
            navigate(`/club/detail/${clubId}`);  // 수정 후 상세 페이지로 이동
        } catch (error) {
            console.error(error);
            alert('구단 정보를 수정하는 중 오류가 발생했습니다.');
        }
    };

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const toggleTime = (time) => {
        setSelectedTimes((prev) =>
            prev.includes(time.value) ? prev.filter((t) => t !== time.value) : [...prev, time.value]
        );
    };

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles['club-detail-container']}>
            <h1 className={styles['club-title']}>구단 수정</h1>

            <div className={styles['form-group']}>
                <label htmlFor="clubName">구단 이름</label>
                <input 
                    type="text" 
                    id="clubName" 
                    value={clubName} 
                    onChange={(e) => setClubName(e.target.value)} 
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="clubIntroduction">구단 소개</label>
                <input 
                    type="text" 
                    id="clubIntroduction" 
                    value={clubIntroduction} 
                    onChange={(e) => setClubIntroduction(e.target.value)} 
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="clubCode">구단 코드</label>
                <input 
                    type="text" 
                    id="clubCode" 
                    value={clubCode} 
                    onChange={(e) => setClubCode(e.target.value)} 
                />
            </div>

            {/* 활동 요일 UI */}
            <div className={styles['form-group']}>
                <label htmlFor="days">활동 요일</label>
                <div className="flex flex-nowrap">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`m-1 p-3 rounded-lg border ${
                                selectedDays.includes(day)
                                    ? 'border-[#16C79A] text-[#16C79A]'
                                    : 'border-[#000000] text-black'
                            }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* 활동 시간대 UI */}
            <div className={styles['form-group']}>
                <label htmlFor="times">활동 시간대</label>
                <div className="flex flex-nowrap">
                    {times.map((time) => (
                        <button
                            key={time.value}
                            onClick={() => toggleTime(time)}
                            className={`m-2 p-3 rounded-lg border ${
                                selectedTimes.includes(time.value)
                                    ? 'border-[#16C79A] text-[#16C79A]'
                                    : 'border-[#000000] text-black'
                            }`}
                        >
                            {time.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 실력 선택 UI */}
            <div className={styles['form-group']}>
                <label htmlFor="skillLevel">실력</label>
                <div className="flex flex-nowrap">
                    {levels.map((level) => (
                        <button
                            key={level}
                            onClick={() => handleLevelClick(level)}
                            className={`m-2 p-4 rounded-lg border ${
                                selectedLevel === level
                                    ? 'border-[#16C79A] text-[#16C79A]'
                                    : 'border-[#000000] text-black'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* 구장 위치 UI */}
            <div className={styles['form-group']}>
                <label htmlFor="stadiumName">구장 이름</label>
                <input
                    type="text"
                    id="stadiumName"
                    value={stadiumName}
                    onChange={(e) => setStadiumName(e.target.value)}
                />
            </div>

            {/* 도시 및 지역 선택 */}
            {stadiumName && (
                <div className={styles['form-group']}>
                    <label htmlFor="selectedCity">도시</label>
                    <select
                        id="selectedCity"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        <option value="" disabled>도시 선택</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedCity && (
                <div className={styles['form-group']}>
                    <label htmlFor="selectedRegion">지역</label>
                    <select
                        id="selectedRegion"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="" disabled>지역 선택</option>
                        {regions[selectedCity].map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className={styles['club-actions']}>
                <button className={styles['edit-btn']} onClick={handleSave}>저장</button>
                <button className={styles['delete-btn']} onClick={() => navigate(`/club/detail/${clubId}`)}>취소</button>
            </div>
        </div>
    );
}

export default ClubEdit;
