
import { Button } from '@/components/ui/button';  // 경로는 컴포넌트 설치 시의 경로를 사용하세요

const FilterButton = ({ children, onClick }) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  );
};

export default FilterButton;