
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px 0;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const MatchTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const MatchDetail = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const HighlightText = styled.span`
  color: #16c79a; /* 강조 색상 */
  font-weight: bold;
`;

const MatchCard = ({ matchData }) => {
  return (
    <Card>
      <MatchTitle>
        {matchData.myClub.clubName} 와(과) {matchData.enemyClub.clubName}의 매치
      </MatchTitle>
      <MatchDetail>경기 날짜/시간: {matchData.schedule.date} {matchData.schedule.startTime}</MatchDetail>
      <MatchDetail>구장 이름: {matchData.fieldLocation}</MatchDetail>
      <MatchDetail>
        <HighlightText>{matchData.playerQuantity}vs{matchData.playerQuantity}</HighlightText> | 선출 {matchData.pro}명
      </MatchDetail>
    </Card>
  );
};

export default MatchCard;
