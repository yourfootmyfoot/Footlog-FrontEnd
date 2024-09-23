import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useClubStore from '@/hooks/useClubStore';  // Zustand 훅
import './ClubDetail.css';  // 필요시 CSS 파일 추가

function ClubDetail() {
    const { clubId } = useParams();  // URL 파라미터에서 clubId 추출
    const navigate = useNavigate();
    const { club, setClub } = useClubStore();  // Zustand에서 club 상태 및 setter 불러오기
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 클럽 정보 로드
    useEffect(() => {
        const fetchClubDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clubs/${clubId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club details');
                }
                const data = await response.json();
                setClub(data);  // 상태에 클럽 데이터 저장
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchClubDetail();
    }, [clubId, setClub]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // 삭제 핸들러
    const handleDelete = async () => {
        const confirmDelete = window.confirm('정말로 이 구단을 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/clubs/${clubId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('구단이 삭제되었습니다.');
                    navigate('/clubs');  // 삭제 후 클럽 목록으로 이동
                } else {
                    throw new Error('Failed to delete the club');
                }
            } catch (error) {
                console.error(error);
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    // 클럽 수정 페이지로 이동
    const goToEdit = () => {
        navigate(`/clubs/edit/${clubId}`);
    };

    return (
        <div className="club-detail-container">
            <h1 className="club-title">{club.clubName}</h1>
            <p className="club-introduction">{club.clubIntroduction}</p>

            <div className="club-info">
                <p><strong>구단 코드:</strong> {club.clubCode}</p>
                <p><strong>등록일:</strong> {new Date(club.erollDate).toLocaleDateString()}</p>
                <p><strong>활동 요일:</strong> {club.days.join(', ')}</p>
                <p><strong>활동 시간대:</strong> {club.times.join(', ')}</p>
            </div>

            <div className="club-actions">
                <button className="edit-btn" onClick={goToEdit}>수정</button>
                <button className="delete-btn" onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
}

export default ClubDetail;
