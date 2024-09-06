import { regionOptions } from '@/config/options';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import FilterButton from '@/components/ui/FilterButton.jsx';
import BottomSheet from '@/components/ui/BottomSheet';
import styles from './Mercenary.module.css';

const MercenaryApplicationList = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const history = useHistory();

  const toggleSheet = useCallback(() => {
    setIsSheetOpen(prev => !prev);
  }, []);

  return (
    <div className={styles.mercenaryContainer}>
      <div className={styles.buttonContainer}>
        <FilterButton label="날짜" onClick={toggleSheet} />
        <FilterButton label="활동 가능 시간" />
        <FilterButton label="나이" />
        <FilterButton label="활동 가능 지역" />
      </div>

      <MercenaryApplicationList /> {/* MercenaryList를 여기에 추가 */}

      <BottomSheet
        options={regionOptions}
        title="지역"
        isOpen={isSheetOpen}
        onClose={toggleSheet} 
      />
    </div>
  );
};

export default MercenaryApplicationList;