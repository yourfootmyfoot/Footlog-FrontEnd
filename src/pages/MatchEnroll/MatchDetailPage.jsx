import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchDetailCard from './components/MatchDetailCard';
import { getMatcheDetail } from './services/match';
import Loading from './components/Loading';

function MatchDetailPage() {
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      const matchDetail = await getMatcheDetail(matchId);
      if (matchDetail) {
        setMatchDetails(matchDetail);

        // 지도 데이터 초기화
        const { fieldLocation } = matchDetail;
        if (typeof fieldLocation === 'string') {
          const ps = new window.kakao.maps.services.Places();
          ps.keywordSearch(fieldLocation, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
              const { x, y } = data[0];
              setMapData([{ x: parseFloat(x), y: parseFloat(y) }]);
            } else {
              console.error('주소 검색 실패:', fieldLocation);
            }
          });
        } else if (fieldLocation?.x && fieldLocation?.y) {
          setMapData([{ x: fieldLocation.x, y: fieldLocation.y }]);
        } else {
          console.error('fieldLocation의 형식이 잘못되었습니다:', fieldLocation);
        }
      }
    };

    if (matchId) {
      fetchMatchDetails();
    }
  }, [matchId]);

  if (!matchDetails) {
    return <Loading />;
  }

  return (
    <div className="p-2 pb-10">
      <MatchDetailCard match={matchDetails} />
    </div>
  );
}

export default MatchDetailPage;