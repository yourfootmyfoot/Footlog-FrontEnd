// src/pages/Match/Match.jsx

import { useState } from 'react';
import styled from '@emotion/styled';
import BottomSheet from '@/components/ui/BottomSheet';
import { regionOptions } from '@/config/options';
import { useHistory } from 'react-router-dom';
import FilterButton from '@/components/ui/FilterButton.jsx';
import MatchList from './MatchList.jsx'; // MatchList 컴포넌트 임포트

const MatchContainer = styled.div`
  width: 100%;
  padding: 2vh 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2vh;

  & > button {
    flex: 1;
    margin: 0 0.5vw;
  }
`;

const Match = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const history = useHistory();

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);
  const handleButtonClickToMatchDetail = () => {
    history.push('/matchDetail', {});
  };

  return (
    <MatchContainer>
      <ButtonContainer>
        <FilterButton label="지역" onClick={openSheet} />
        <FilterButton label="경기 시간/날짜" />
        <FilterButton label="쿼터 수" />
        <FilterButton label="매치 인원" />
      </ButtonContainer>

      <MatchList /> {/* MatchList를 여기에 추가 */}

      <BottomSheet
        options={regionOptions}
        title="지역"
        isOpen={isSheetOpen}
        onClose={closeSheet}
      />
      <button onClick={openSheet}>지역</button>
      <button onClick={handleButtonClickToMatchDetail}>상세 페이지로 이동하기</button>
    </MatchContainer>
  );
};

export default Match;
