import { useHistory } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NoClub from './NoClub';
import Avatar from './Avatar';

// Sample club data structure for reference:
// {
//   clubCode: 1,
//   name: "FC Seoul",
//   logo: "src/pages/ClubList/images/logo1.png",
//   location: "서울특별시 강남구",
//   playerQuantity: 12,
// }

const MOCKUSERROLE = ['구단주', '매니저', '구단원'];

function UserClubCard({ clubs }) {
  const history = useHistory();

  function routeToClubList() {
    history.push('/clubList');
  }

  // !club page test -> NoClub
  // clubs = null;
  if (!clubs || clubs.length === 0) {
    return <NoClub handleClick={routeToClubList} />;
  }

  // 가입된 첫 클럽만 일단 보여주기
  const club = clubs[0];

  return (
    <div className="bg-cardBackground shadow-lg rounded-lg p-6 max-w-md h-44">
      <div className="flex items-center space-x-4">
        <Avatar src={club.logo} />
        <div>
          <div className="flex gap-2">
            <div className="text-xl font-bold text-gray-800">{club.name}</div>
            <div className="bg-main mx-auto px-2 font-bold text-white text-sm rounded-full flex items-center bg-opacity-80">
              {/* 수정 필요(구단원, 매니저, 구단원) */}
              {MOCKUSERROLE[2]}
            </div>
          </div>
          <div className="text-sm text-gray-600">{club.location}</div>
          <div className="text-sm text-blue-600">
            플레이어 수: {club.playerQuantity}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <a
          href={club.moreInfoLink}
          className={cn(
            'inline-block bg-slate-200 w-full  rounded-full hover:bg-opacity-70 px-4 py-2 text-sm font-semibold shadow-md transition-colors duration-300'
          )}
        >
          더보기
        </a>
      </div>
    </div>
  );
}

export default UserClubCard;
