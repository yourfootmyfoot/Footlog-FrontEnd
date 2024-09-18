// src/components/ActiveFilters.jsx
import styled from '@emotion/styled';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterTag = styled.div`
  background-color: #e0e0e0;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  margin-left: 8px;
  cursor: pointer;
`;

const ActiveFilters = ({ filters, onRemove }) => {
  return (
    <FilterContainer>
      {Object.entries(filters).map(([key, value]) => {
        if (!value) return null;
        return (
          <FilterTag key={key}>
            {`${key}: ${value}`}
            <RemoveButton onClick={() => onRemove(key)}>×</RemoveButton>
          </FilterTag>
        );
      })}
    </FilterContainer>
  );
};

export default ActiveFilters;