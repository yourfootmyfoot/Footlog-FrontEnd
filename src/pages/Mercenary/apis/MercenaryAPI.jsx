// JSON 파일로부터 매치 정보를 가져와서 여러 가지 함수로 검색 및 필터링하는 모듈
import mercenariesApp from '../data/MercenaryApp.json';
import mercenariesRec from '../data/MercenaryRec.json';

// 백엔드 API 기본 URL
const BASE_URL = 'http://localhost:8080/api';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// 용병 할래요 페이지

// mercenaryAppList
export function getMercenaryAppList() {

    return mercenariesApp;
}

// MercenaryApp 정보를 가져온다.
export function getMercenaryAppInfo(MercenaryAppCode) {
    console.log(mercenariesApp);

    return mercenariesApp.filter(mercenary => mercenary.Code === parseInt(MercenaryAppCode))[0];
}

// 용병 구해요 페이지

// mercenaryRecList
export async function getMercenaryRecList() {
  try {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/guest-recruitments`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error('서버 응답이 실패했습니다');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    throw error;
  }
}

// MercenaryApp 정보를 가져온다.
export async function getMercenaryRecInfo(recruitmentId) {
  try {
    const response = await fetch(`${BASE_URL}/guest-recruitments/${recruitmentId}`);
    if (!response.ok) {
      throw new Error('서버 응답이 실패했습니다');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recruitment details:', error);
    throw error;
  }
}