const BASE_URL = 'http://localhost:8080/api';

export async function getMyClubList() {
  const token = localStorage.getItem('accessToken');
  
  try {
    const response = await fetch(`${BASE_URL}/clubs/my-clubs`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('구단 정보를 불러오는데 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch clubList:', error);
    return null;
  }
}