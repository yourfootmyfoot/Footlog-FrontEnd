// src/config/options.js

export const regionOptions = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

export const quarterCountOptions = ['1', '2', '3', '4'];

export const playerCountOptions = ['5:5', '6:6', '7:7', '10:10', '11:11'];

export const clubLevelOptions = ['beginner', 'intermediate', 'advanced'];

export const genderOptions = ['Male', 'Female', 'Mixed'];

export const getFilterOptions = (filterType) => {
  switch (filterType) {
    case 'region':
      return regionOptions;
    case 'quarterCount':
      return quarterCountOptions;
    case 'playerCount':
      return playerCountOptions;
    case 'clubLevel':
      return clubLevelOptions;
    case 'gender':
      return genderOptions;
    default:
      return [];
  }
};