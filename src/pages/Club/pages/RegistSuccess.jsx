import { useNavigate } from 'react-router-dom';
import successImage from '../../../assets/registsuccess.png'

function RegistrationSuccess() {
    const navigate = useNavigate();

  // 홈 또는 다른 페이지로 이동하는 함수
    const goBackToHome = () => {
    navigate('/ClubList'); // 성공 후 이동할 경로를 '/' 대신 원하는 페이지로 변경
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="p-6 rounded-lg shadow-lg bg-white">
                <img
                src={successImage}
                alt="Registration Success"
                className="w-full h-auto mb-6"
                />
                <h2 className="text-2xl font-bold text-center text-[#16C79A] mb-4">
                등록이 완료되었습니다!
                </h2>
                <p className="text-gray-600 text-center mb-6">
                팀 정보가 성공적으로 저장되었습니다. 등록해주셔서 감사합니다!
                </p>
                <button
                className="p-3 bg-[#16C79A] text-white rounded-lg w-full"
                onClick={goBackToHome}
                >
                홈으로 가기
                </button>
            </div>
        </div>
    );
}

export default RegistrationSuccess;
