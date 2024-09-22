import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용

function RegistSchedule() {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 호출

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

    const goBack = () => {
        navigate('/club/regist'); // 이전 페이지로 이동 (ClubRegist로 이동)
    };

    const goNext = () => {
        navigate('/club/regist/location'); // RegistLocation 페이지로 이동
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
                    onClick={goNext}
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