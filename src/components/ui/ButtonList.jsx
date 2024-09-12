import styled from '@emotion/styled';
import { useState } from 'react';
import BottomSheet from './BottomSheet';
import FilterButton from './FilterButton';

const FilterButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* 그룹 전체 마진 */
`;

const ButtonList = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const openSheet = (filter) => {
    setSelectedFilter(filter);
    setIsSheetOpen(true);
  };

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      <FilterButtonGroup>
        <FilterButton onClick={() => openSheet('지역')}>
          지역 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
        </FilterButton>
        <FilterButton onClick={() => openSheet('경기시간/날짜')}>
          경기시간/날짜 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
        </FilterButton>
        <FilterButton onClick={() => openSheet('쿼터 수')}>
          쿼터 수 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
        </FilterButton>
        <FilterButton onClick={() => openSheet('매치인원')}>
          매치인원 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
        </FilterButton>
      </FilterButtonGroup>

      {/* BottomSheet 컴포넌트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet} title={selectedFilter} />
    </>
  );
};

export default ButtonList;
