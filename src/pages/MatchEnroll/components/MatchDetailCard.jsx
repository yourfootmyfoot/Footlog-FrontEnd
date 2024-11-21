import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import MatchStatusBadge from './badge/MatchStatusBadge';
import ClubLevelBadge from './badge/ClubLevelBadge';
import SelectClubList from './SelectClubList';
import { applyForMatch, acceptMatch, rejectMatch } from '../services/match';
import { getCardBackgroundStyles } from '../utils';
import { useUserStore } from '@/hooks/useUserStore';
import KakaoMap from './KakaoMap';

function MatchDetailCard({ match }) {
  const {
    matchEnrollUserId,
    myClub,
    enemyClub,
    matchIntroduce,
    matchSchedule: { matchDate, matchStartTime, matchEndTime },
    matchPlayerQuantity,
    quarterQuantity,
    fieldLocation, // 필드 위치
    matchCost,
    pro: { isPro, proQuantity },
    clubLevel,
    matchGender,
    matchStatus,
  } = match;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [localMatchStatus, setLocalMatchStatus] = useState(matchStatus);
  const { userId } = useUserStore();

  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const initializeMapData = async () => {
      if (!fieldLocation) return;
  
      if (typeof fieldLocation === 'string') {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(fieldLocation, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
            const { x, y } = data[0];
            console.log('주소 변환된 좌표:', { x, y });
            setMapData([{ x: parseFloat(x), y: parseFloat(y) }]);
          } else {
            console.error('주소 검색 실패:', fieldLocation);
          }
        });
      } else if (fieldLocation?.x && fieldLocation?.y) {
        console.log('좌표 데이터:', fieldLocation);
        setMapData([{ x: fieldLocation.x, y: fieldLocation.y }]);
      } else {
        console.error('fieldLocation의 형식이 잘못되었습니다:', fieldLocation);
      }
    };
  
    if (fieldLocation) {
      initializeMapData();
    }
  }, [fieldLocation, match]);

  // 상대팀 이름 처리
  const enemyClubName = enemyClub ? enemyClub.clubName : '상대가 아직 없습니다';

  // 클럽 선택 핸들러
  const handleClubSelect = (clubId) => {
    setSelectedClub(clubId);
  };

  // 경기 신청 핸들러
  const handleApplyClick = async () => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인이 필요해요');
      return;
    }
    if (myClub.clubId === parseInt(selectedClub)) {
      alert('본인의 경기에 신청할 수 없습니다.');
      setIsModalOpen(false);
      return;
    }
    if (selectedClub) {
      try {
        await applyForMatch(match.matchId, selectedClub);
        alert('신청이 완료되었습니다.');
        setLocalMatchStatus('PENDING');
        setIsModalOpen(false);
      } catch (error) {
        alert('신청에 실패했습니다.');
        setLocalMatchStatus('WAITING');
      }
    }
  };

  const handleAccept = async () => {
    try {
      await acceptMatch(match.matchId);
      alert('경기가 수락되었습니다.');
      setLocalMatchStatus('PENDING');
    } catch (error) {
      alert('경기 수락에 실패했습니다.');
      setLocalMatchStatus('WAITING');
    }
  };

  const handleReject = async () => {
    try {
      await rejectMatch(match.matchId);
      alert('경기가 거절되었습니다.');
      setLocalMatchStatus('WAITING');
    } catch (error) {
      alert('경기 거절에 실패했습니다.');
    }
  };

  const onGoingStatus =
    localMatchStatus === 'ACCEPTED' || localMatchStatus === 'PLAYING' || localMatchStatus === 'FINISHED';

  return (
    <div
      className={`max-w-2xl mx-auto ${getCardBackgroundStyles(localMatchStatus)} shadow-md rounded-lg overflow-hidden p-2`}
    >
      <MatchStatusBadge status={localMatchStatus} />
      <div className="p-4">
        <h2 className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-500 ease-in-out transform hover:-translate-x-2">
          {myClub.clubName} vs {enemyClubName}
        </h2>
      </div>

      {/* 등록자 정보 */}
      <p className="text-sm text-gray-700 py-2 px-4">
        <strong>등록자 ID:</strong> {matchEnrollUserId}
      </p>

      {/* 클럽 정보 */}
      <div className="p-4">
        <p className="text-base text-gray-700">
          <strong>클럽 이름:</strong> {myClub.clubName}
        </p>
        <p className="text-base text-gray-700">
          <strong>클럽 소개:</strong>
          {myClub.clubIntroduction || '클럽 소개가 없습니다.'}
        </p>
        <p className="text-base text-gray-700">
          <strong>클럽 레벨:</strong> {myClub.clubLevel}
        </p>
      </div>

      {/* 매치 정보 */}
      <div className="px-6 py-4">
        <p className="text-base text-gray-700 mb-4">{matchIntroduce}</p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-base font-semibold">
            🗓 {matchDate}
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-base font-semibold">
            ⏰ {matchStartTime} - {matchEndTime}
          </span>
        </div>
        <KakaoMap mapData={mapData} />
        <div className="text-base text-gray-700 mb-4">
          📍 경기 장소: {typeof fieldLocation === 'string' ? fieldLocation : fieldLocation.address || '위치 정보 없음'}
        </div>

        <div className="flex space-x-2 mb-4">
          <ClubLevelBadge level={clubLevel} />
          <span className="inline-block bg-slate-200 text-slate-900 rounded-full px-3 py-1 text-base font-semibold">
            {matchGender}
          </span>
        </div>

        <div className="text-base text-gray-700 mb-4">
          <p className="text-base text-gray-700">
            <strong>매치 인원:</strong> {matchPlayerQuantity}명
          </p>
          <p className="text-base text-gray-700">
            <strong>쿼터:</strong> {quarterQuantity}
          </p>
          <p className="text-base text-gray-700">
            <strong>경기 비용:</strong> {matchCost} 만원
          </p>
          <p className="text-base text-gray-700">
            <strong>프로 선수 포함 여부:</strong>
            {isPro ? `${proQuantity}명` : '아니오'}
          </p>
        </div>
      </div>

      {userId === matchEnrollUserId ? (
        localMatchStatus === 'WAITING' ? (
          <div className="text-center mt-4">매칭 대기중 ⏳</div>
        ) : localMatchStatus === 'PENDING' ? (
          <div className="flex space-x-4 justify-center mt-4">
            <Button className="bg-main" onClick={handleAccept}>
              수락
            </Button>
            <Button className="bg-red-200" onClick={handleReject}>
              거절
            </Button>
          </div>
        ) : (
          onGoingStatus && (
            <div className="flex justify-center items-center mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg">
              <span role="img" aria-label="celebration" className="mr-2">
                🎉
              </span>
              같이 즐겨요
              <span role="img" aria-label="celebration" className="ml-2">
                🎉
              </span>
            </div>
          )
        )
      ) : localMatchStatus === 'WAITING' ? (
        <Button
          className="w-full text-center bg-main"
          onClick={() => setIsModalOpen(true)}
        >
          매칭 시도
        </Button>
      ) : localMatchStatus === 'PENDING' ? (
        <div className="text-center mt-4">수락 대기중 ⏳</div>
      ) : (
        onGoingStatus && (
          <div className="flex justify-center items-center mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg">
            <span role="img" aria-label="celebration" className="mr-2">
              🎉
            </span>
            같이 즐겨요
            <span role="img" aria-label="celebration" className="ml-2">
              🎉
            </span>
          </div>
        )
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">클럽 선택</h2>
            <SelectClubList onSelect={handleClubSelect} /> {/* 클럽 선택 */}
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                className="bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                닫기
              </Button>
              <Button className="bg-main" onClick={handleApplyClick}>
                신청하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchDetailCard;