export const USERINFOMOCK = {
  position: 'FW',
  name: '선수이름',
  isPro: true,
  profileImage: 'src/pages/Profile/images/profile.webp',
};

export const USERCLUBLISTSMOCK = [
  {
    clubCode: 1,
    name: 'FC Seoul',
    logo: 'src/pages/ClubList/images/logo1.png',
    playerQuantity: 12,
    clubStatus: '모집 중',
    location: '서울특별시 강남구',
    stadium: '서울 월드컵 경기장',
    gender: '남성',
    type: '축구',
    age: '20~30대',
    activityTime: '주말 아침',
    level: '하중상',
  },
  {
    clubCode: 2,
    name: 'Busan United',
    logo: 'src/pages/ClubList/images/logo2.png',
    playerQuantity: 18,
    clubStatus: '모집 완료',
    location: '부산광역시 해운대구',
    stadium: '부산 아시아드 경기장',
    gender: '혼성',
    type: '풋살',
    age: '30~40대',
    activityTime: '평일 저녁',
    level: '중중중',
  },
];

export const USERSTATSMOCK = [
  { label: '경기', value: '1' },
  { label: '득점', value: '3' },
  { label: '도움', value: '5' },
  { label: 'mom', value: '3' },
];

export const USERABILITYMOCK = {
  labels: ['체력', '수비', '스피드', '패스', '슈팅', '드리블'],
  datasets: [
    {
      label: 'My Football Stats',
      data: [90, 70, 75, 75, 60, 35],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Points color
    },
  ],
};
