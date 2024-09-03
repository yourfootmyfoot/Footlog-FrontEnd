import MatchCard from '@/components/ui/MatchCard';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MatchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const matchDataList = [
  {
    myClub: "구단 이름A",
    enemyClub: "구단 이름B",
    matchDate: "2023-09-28 18:00",
    fieldLocation: "구장 이름",
    matchType: "11vs11",
    playerCount: 22,
    proCount: 0
  },
  {
    myClub: "구단 이름A",
    enemyClub: "구단 이름B",
    matchDate: "2023-09-30 18:00",
    fieldLocation: "구장 이름",
    matchType: "11vs11",
    playerCount: 22,
    proCount: 2
  },
  {
    myClub: "구단 이름A",
    enemyClub: "구단 이름B",
    matchDate: "2023-09-15 18:00",
    fieldLocation: "구장 이름",
    matchType: "11vs11",
    playerCount: 22,
    proCount: 2
  },
  {
    myClub: "구단 이름A",
    enemyClub: "구단 이름B",
    matchDate: "2023-09-11 18:00",
    fieldLocation: "구장 이름",
    matchType: "11vs11",
    playerCount: 22,
    proCount: 2
  }
];

const getMatches = async () => {
  //try {
  //  const response = await axios.get(`${API_BASE_URL}/matches`);
  //  return response.data;
  //} catch (error) {
  //  console.error('Failed to fetch matches:', error);
  //  throw error;
  //}
  return (matchDataList);
};

const MatchList = () => {

  const [matches, setMatches] = useState([]); // 경기를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches(); // API 호출
        setMatches(data); // 데이터 저장
      } catch (err) {
        setError('경기 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchMatches(); // 데이터 가져오기 함수 호출
  }, []);
  return (
    <MatchListContainer>
      {matches.map((matchData, index) => (
        <MatchCard key={index} matchData={matchData} />
      ))}
    </MatchListContainer>
  );
};

export default MatchList;
