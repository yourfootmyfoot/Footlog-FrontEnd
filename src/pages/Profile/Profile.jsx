import UserInfoCard from './components/UserInfoCard';
import UserClubCard from './components/UserClubCard';
import UserStatsCard from './components/UserStats';
import {
  USERINFOMOCK,
  USERCLUBLISTSMOCK,
  USERSTATSMOCK,
  USERABILITYMOCK,
} from './data/data';
import UserAbility from './components/UserAbility';

export default function Profile() {
  return (
    <div className="w-full flex flex-col gap-4 px-4 pb-20">
      <div className="font-bold text-2xl">프로필 페이지</div>
      <UserInfoCard userInfo={USERINFOMOCK} />
      <UserClubCard clubs={USERCLUBLISTSMOCK} />
      <UserStatsCard userStats={USERSTATSMOCK} />
      <UserAbility ability={USERABILITYMOCK} />
    </div>
  );
}
