import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchDetailCard from './components/MatchDetailCard';
import { getMatcheDetail } from './services/match';

function MatchDetailPage() {
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      const data = await getMatcheDetail(matchId);
      if (data) {
        setMatchDetails(data);
      }
    };
    if (matchId) {
      fetchMatchDetails();
    }
  }, [matchId]);

  if (!matchDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <MatchDetailCard match={matchDetails} />
    </div>
  );
}

export default MatchDetailPage;
