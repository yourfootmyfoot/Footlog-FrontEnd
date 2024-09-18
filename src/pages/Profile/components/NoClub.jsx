import { Button } from '@/components/ui/button';

function NoClub({ handleClick }) {
  return (
    <div className="max-w-md flex flex-col items-center justify-center h-44 shadow-md rounded-lg p-4 gap-2">
      <div className="text-gray-400">가입된 구단이 없습니다.</div>
      <Button onClick={handleClick} className="bg-main">
        구단 가입하러가자
      </Button>
    </div>
  );
}

export default NoClub;
