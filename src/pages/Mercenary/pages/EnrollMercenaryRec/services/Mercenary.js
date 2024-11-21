/**
 *
 * @param {*} data EnrollMercenaryData
 */

// MercenaryEnrollForm에서 제출된 데이터를 서버의 /api/Mercenary-enroll 엔드 포인트로 전송합니다.

const BASE_URL = 'http://localhost:8080/api';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export async function postMercenaryEnroll(data) {
  try {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/guest-recruitments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        matchDateTime: data.matchDateTime,
        location: data.location,
        requiredNumber: parseInt(data.requiredNumber),
        requiredPositions: data.requiredPositions,
        pay: parseInt(data.pay),
        description: data.description || ''
      }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      throw new Error('모집글 등록에 실패했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}