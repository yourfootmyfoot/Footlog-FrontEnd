// src/pages/Match/Match.jsx

import { useState } from 'react';
import BottomSheet from '@/components/ui/BottomSheet';
import { regionOptions } from '@/config/options';
import { useHistory } from 'react-router-dom';

const Match = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const history = useHistory();

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);
  const handleButtonClickToMatchDetail = () => {
    history.push('/matchDetail', {});
  };
  return (
    <div>
      <button onClick={openSheet}>지역 선택</button>
      <BottomSheet
        options={regionOptions}
        title="지역"
        isOpen={isSheetOpen}
        onClose={closeSheet}
      />
      <button onClick={handleButtonClickToMatchDetail}>상세 페이지로 이동하기</button>
    </div>
    
  );
};

export default Match;
