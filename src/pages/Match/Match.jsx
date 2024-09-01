// src/pages/Match/Match.jsx

import { useState } from 'react';
import BottomSheet from '@/components/ui/BottomSheet';
import { regionOptions } from '@/config/options';

const Match = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <div>
      <button onClick={openSheet}>지역 선택</button>
      <BottomSheet
        options={regionOptions}
        title="지역"
        isOpen={isSheetOpen}
        onClose={closeSheet}
      />
    </div>
  );
};

export default Match;
