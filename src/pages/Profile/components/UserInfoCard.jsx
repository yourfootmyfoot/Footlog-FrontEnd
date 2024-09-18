import Avatar from './Avatar';
import ProTag from './ProTag';

function UserInfoCard({ userInfo }) {
  return (
    <div className="w-full mt-2 bg-cardBackground shadow-md rounded-lg p-4 max-w-md">
      <div className="flex items-center space-x-4">
        <Avatar src={userInfo.profileImage} />
        <div>
          <div className="text-2xl font-bold text-gray-800">
            {userInfo.name}
          </div>
          <div className="text-sm text-main font-semibold">
            {userInfo.position}
          </div>
          <ProTag isPro={userInfo.isPro} className="mt-2" />
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
