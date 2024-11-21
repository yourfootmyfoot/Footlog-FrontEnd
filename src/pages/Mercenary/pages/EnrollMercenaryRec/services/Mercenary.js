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
        title: data.title,
        clubId: data.clubId,
        matchDate: data.matchDate,
        matchStartTime: data.matchStartTime,
        matchEndTime: data.matchEndTime,
        location: data.location,
        requiredNumber: data.requiredNumber,
        requiredPositions: data.requiredPositions,
        pay: data.pay,
        description: data.description
      }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || '모집글 등록에 실패했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getMercenaryRecDetail(id) {
  try {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/guest-recruitments/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      throw new Error('모집글을 불러오는데 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function updateMercenaryRec(id, data) {
  try {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/guest-recruitments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: data.title,
        clubId: data.clubId,
        matchDate: data.matchDate,
        matchStartTime: data.matchStartTime,
        matchEndTime: data.matchEndTime,
        location: data.location,
        requiredNumber: data.requiredNumber,
        requiredPositions: data.requiredPositions,
        pay: data.pay,
        description: data.description
      }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || '모집글 수정에 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}