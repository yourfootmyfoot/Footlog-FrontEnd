// const stats = [
//   { label: '경기', value: '1' },
//   { label: '득점', value: '3' },
//   { label: '도움', value: '5' },
//   { label: 'mom', value: '3' },
// ];

function UserStatsCard({ userStats }) {
  return (
    <div className="w-full bg-cardBackground shadow-md rounded-lg p-4 max-w-md">
      <div className="font-bold mb-2">개인통산</div>
      <div className="flex justify-between">
        {userStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="font-semibold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserStatsCard;
