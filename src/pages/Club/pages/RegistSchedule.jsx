import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import useClubStore from '@/hooks/useClubStore';

function RegistSchedule() {
    const navigate = useNavigate(); // useNavigate 훅 호출
    
    const { schedule, setSchedule } = useClubStore(); // 상태 업데이트 함수 불러오기

    // zustand에서 저장된 값을 가져와 로컬 상태로 설정
    const [selectedDays, setSelectedDays] = useState(schedule.days || []);
    const [selectedTimes, setSelectedTimes] = useState(schedule.times || []);

    useEffect(() => {
        // zustand에 값이 있으면 로컬 상태에 반영
        if (schedule.days) setSelectedDays(schedule.days);
        if (schedule.times) setSelectedTimes(schedule.times);
    }, [schedule]);

    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const times = ['아침 6~10시', '낮 10~18시', '저녁 18~24시', '심야 24~6시'];

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const toggleTime = (time) => {
        setSelectedTimes((prev) =>
        prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
        );
    };
    
    const handleSubmit = () => {
        setSchedule(selectedDays, selectedTimes); // zustand 상태 업데이트
        navigate('/club/regist/location'); // 다음 페이지로 이동
    };

    const goBack = () => {
        navigate('/club/regist'); // 이전 페이지로 이동 (ClubRegist로 이동)
    };


    return (
        <div className="mt-6 ml-6 mr-6">
        <h2 className="text-lg font-bold">주로 언제 운동하나요?</h2>
        <p className="text-muted-foreground">자주 차는 시간과 요일을 알려주세요.</p>

        <div className="mt-4">
            <label className="block text-muted-foreground">활동 요일</label>
            <div className="flex flex-wrap">
            {days.map((day) => (
                <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`m-2 p-4 rounded-lg border ${
                    selectedDays.includes(day)
                        ? 'border-[#16C79A] text-[#16C79A]'
                        : 'border-primary text-black'
                }`}
            >
                {day}
            </button>
            ))}
            </div>
        </div>

        <div className="mt-4">
            <label className="block text-muted-foreground">활동 시간대</label>
            <div className="flex flex-wrap">
            {times.map((time) => (
                <button
                key={time}
                onClick={() => toggleTime(time)}
                className={`m-2 p-4 rounded-lg border ${
                    selectedTimes.includes(time)
                        ? 'border-[#16C79A] text-[#16C79A]'
                        : 'border-primary text-black'
                }`}
            >
                {time}
            </button>
            ))}
            </div>
        </div>

        <div className="mt-6 flex justify-between">
        <button
                    className="p-2 rounded-lg w-1/2 mr-4"
                    onClick={goBack}
                    style={{
                        backgroundColor: 'rgb(235, 248, 245)',
                        color: 'rgb(92, 196, 157)',
                    }}
                >
                    뒤로
                </button>
                <button
                    className="p-2 rounded-lg w-1/2 mr-2"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: 'rgb(92, 196, 157)',
                        color: 'rgb(235, 248, 245)',
                    }}
                >
                    다음
                </button>
        </div>
        </div>
    );
}

export default RegistSchedule;