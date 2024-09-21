// src/pages/Match/Match.jsx
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import BottomSheet from '@/components/ui/BottomSheet';
import FilterButton from '@/components/ui/FilterButton';
import MatchCard from '@/components/ui/MatchCard';
import { Calendar } from '@/components/ui/calendar';
import matchData from '@/pages/Match/data/match-detail.json';
import { getFilterOptions } from '@/config/options';
import EnrollMatchButton from '../MatchEnroll/components/EnrollButton';

const MatchContainer = styled.div`
  width: 100%;
  padding: 2vh 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2vh;
  overflow-x: auto;
  white-space: nowrap;

  & > button {
    flex: 1;
    margin: 0 0.5vw;
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  width: 100%;
`;

const ActiveFilterTag = styled.div`
  background-color: #e0e0e0;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: #666;
  margin-left: 8px;
  cursor: pointer;
`;

const MatchListContainer = styled.div`
  width: 100%;
`;

const Match = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredMatches, setFilteredMatches] = useState(matchData);
  const [filters, setFilters] = useState({
    region: '',
    date: null,
    quarterCount: '',
    playerCount: ''
  });

  const openSheet = (filter) => {
    setActiveFilter(filter);
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    setActiveFilter(null);
  };

  const handleFilterSelect = (value) => {
    setFilters(prev => ({ ...prev, [activeFilter]: value }));
    closeSheet();
  };

  const handleRemoveFilter = (filterKey) => {
    setFilters(prev => ({ ...prev, [filterKey]: '' }));
  };

  useEffect(() => {
    const newFilteredMatches = matchData.filter(match => {
      if (filters.region && match.region !== filters.region) return false;
      if (filters.date && match.schedule.date !== filters.date) return false;
      if (filters.quarterCount && match.quarterQuantity !== parseInt(filters.quarterCount)) return false;
      if (filters.playerCount && match.playerQuantity !== parseInt(filters.playerCount.split(':')[0])) return false;
      return true;
    });
    setFilteredMatches(newFilteredMatches);
  }, [filters]);

  const getBottomSheetContent = () => {
    switch (activeFilter) {
      case 'region':
        return {
          title: '지역',
          options: getFilterOptions('region'),
          type: 'grid'
        };
      case 'date':
        return {
          title: '경기 날짜',
          type: 'calendar'
        };
      case 'quarterCount':
        return {
          title: '쿼터 수',
          options: getFilterOptions('quarterCount'),
          type: 'grid'
        };
      case 'playerCount':
        return {
          title: '매치 인원',
          options: getFilterOptions('playerCount'),
          type: 'grid'
        };
      default:
        return { title: '', options: [], type: 'grid' };
    }
  };

  const formatFilterValue = (key, value) => {
    if (key === 'date' && value) {
      const date = new Date(value);

      //return value ? new Date(value).toLocaleDateString() : '';
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
    return value;
  };

  return (
    <MatchContainer>
      <ButtonContainer>
        <FilterButton onClick={() => openSheet('region')}>지역</FilterButton>
        <FilterButton onClick={() => openSheet('date')}>경기 날짜</FilterButton>
        <FilterButton onClick={() => openSheet('quarterCount')}>쿼터 수</FilterButton>
        <FilterButton onClick={() => openSheet('playerCount')}>매치 인원</FilterButton>
      </ButtonContainer>

      <ActiveFiltersContainer>
        {Object.entries(filters).map(([key, value]) => {
          if (!value) return null;
          return (
            <ActiveFilterTag key={key}>
              {`${key}: ${formatFilterValue(key, value)}`}
              <RemoveFilterButton onClick={() => handleRemoveFilter(key)}>×</RemoveFilterButton>
            </ActiveFilterTag>
          );
        })}
      </ActiveFiltersContainer>

      <MatchListContainer>
        {filteredMatches.map((match, index) => (
          <MatchCard key={index} matchData={match} />
        ))}
      </MatchListContainer>

      <BottomSheet
        {...getBottomSheetContent()}
        isOpen={isSheetOpen}
        onClose={closeSheet}
        onSelect={handleFilterSelect}
      >
        {activeFilter === 'date' && (
          <Calendar 
            mode="single"
            selected={filters.date ? new Date(filters.date) : undefined}
            onSelect={(date) => {
              if (date) {
                const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
                const dateString = utcDate.toISOString().split('T')[0]
                handleFilterSelect(dateString);
              } else {
                handleFilterSelect(null);
              }
            }}
          />
        )}
      </BottomSheet>
      <EnrollMatchButton />
    </MatchContainer>
  );
};

export default Match;