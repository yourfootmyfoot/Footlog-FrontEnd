import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'; 

function RegistLocation() {

    const navigate = useNavigate(); // useNavigate 훅 호출
    // 구장 이름 상태 관리
    const [autocomplete, setAutocomplete] = useState(null);
    const [stadiumName, setStadiumName] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const cities = ['서울', '경기', '인천']; // 도시 목록
    const regions = {
        '서울': ['강남구', '서초구', '마포구'],
        '경기': ['성남시', '수원시', '고양시'],
        '인천': ['남동구', '연수구', '부평구'],
    }; // 도시별 지역 목록

    // Google Maps API 로드
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDNTHF9g-REtps9slppbGdR899ZeiDv768', // Google API 키
        libraries: ['places'], // Places 라이브러리를 불러옴
    });

    const onLoad = (autoC) => {
        setAutocomplete(autoC);  // Autocomplete 객체 저장
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace(); // 선택된 장소 정보 가져오기
            setStadiumName(place.name); // 장소 이름을 상태로 설정
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    // 뒤로 가기 버튼 클릭 처리
    const goBack = () => {
        navigate('/club/regist/schedule'); // 이전 페이지로 이동
    };

    // 다음 버튼 클릭 처리
    const handleSubmit = () => {
        if (stadiumName.trim() && selectedCity && selectedRegion) {
            // 구장 이름, 도시, 지역이 입력되었으면 다음 페이지로 이동
            navigate('/club/regist/age-gender', { state: { stadiumName, selectedCity, selectedRegion } });
        } else {
            alert("구장 이름, 도시 및 지역을 입력해주세요."); // 입력 요구
        }
    };

    // 로딩이 완료되지 않았을 때는 로딩 메시지 출력 (useJsApiLoader는 컴포넌트 최상단에서 호출된 상태)
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-6 ml-6 mr-6">
            <h2 className="text-lg font-bold">주로 어디서 운동하나요?</h2>
            <p className="text-sm text-muted-foreground">가장 먼저 생각나는 구장 알려주세요.</p>

            <div className="mt-4">
                <label className="block text-muted-foreground">구장 이름</label>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                        type="text"
                        placeholder="홈 구장 찾기"
                        value={stadiumName} // 입력 상태 값 연결
                        onChange={(e) => setStadiumName(e.target.value)} // 입력 변경 시 상태 업데이트
                        className="mt-2 p-4 w-full rounded-lg border border-primary text-black"
                        style={{
                            backgroundColor: 'rgb(245, 245, 245)', // 배경색 설정
                        }}
                    />
                </Autocomplete>
            </div>

            {/* 도시 및 지역 선택 */}
            {stadiumName && (
                <div className="mt-6">
                    {/* 도시 선택 */}
                    <div className="mt-4">
                        <label className="block text-muted-foreground">도시</label>
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="mt-2 p-4 w-full rounded-lg border border-primary text-black"
                            style={{ backgroundColor: 'rgb(245, 245, 245)' }}
                        >
                            <option value="" disabled>도시 선택</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* 지역 선택 */}
                    <div className="mt-4">
                        <label className="block text-muted-foreground">지역</label>
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="mt-2 p-4 w-full rounded-lg border border-primary text-black"
                            style={{ backgroundColor: 'rgb(245, 245, 245)' }}
                        >
                            <option value="" disabled>지역 선택</option>
                            {selectedCity && regions[selectedCity].map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="mt-6 flex justify-between">
                <button
                    className="p-2 rounded-lg w-1/2 mr-2"
                    onClick={goBack}
                    style={{
                        backgroundColor: 'rgb(235, 248, 245)', // '뒤로' 버튼 배경색
                        color: 'rgb(92, 196, 157)', // '뒤로' 버튼 글자색
                    }}
                >
                    뒤로
                </button>
                <button
                    className="p-2 rounded-lg w-1/2 ml-2"
                    onClick={handleSubmit} // 제출 시 호출
                    style={{
                        backgroundColor: 'rgb(92, 196, 157)', // '다음' 버튼 배경색
                        color: 'rgb(235, 248, 245)', // '다음' 버튼 글자색
                    }}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default RegistLocation;
