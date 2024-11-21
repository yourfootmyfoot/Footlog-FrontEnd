const BASE_URL = '/api';

// 용병 지원 관련 API
export const guestPostAPI = {
  // 용병 지원글 목록 조회
  getAllPosts: async (status) => {
    const response = await fetch(`${BASE_URL}/guest-posts${status ? `?status=${status}` : ''}`);
    return response.json();
  },

  // 용병 지원글 상세 조회
  getPost: async (postId) => {
    const response = await fetch(`${BASE_URL}/guest-posts/${postId}`);
    return response.json();
  },

  // 용병 지원글 작성
  createPost: async (data) => {
    const response = await fetch(`${BASE_URL}/guest-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // 용병 지원글 수정
  updatePost: async (postId, data) => {
    const response = await fetch(`${BASE_URL}/guest-posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // 용병 지원글 삭제
  deletePost: async (postId) => {
    await fetch(`${BASE_URL}/guest-posts/${postId}`, {
      method: 'DELETE',
    });
  },
};

// 용병 모집 관련 API
export const guestRecruitmentAPI = {
  // 용병 모집글 목록 조회
  getAllRecruitments: async (status) => {
    const response = await fetch(`${BASE_URL}/guest-recruitments${status ? `?status=${status}` : ''}`);
    return response.json();
  },

  // 용병 모집글 상세 조회
  getRecruitment: async (recruitmentId) => {
    const response = await fetch(`${BASE_URL}/guest-recruitments/${recruitmentId}`);
    return response.json();
  },

  // 용병 모집글 작성
  createRecruitment: async (data) => {
    const response = await fetch(`${BASE_URL}/guest-recruitments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // 용병 신청
  applyForRecruitment: async (recruitmentId, data) => {
    const response = await fetch(`${BASE_URL}/guest-recruitments/${recruitmentId}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // 내 용병 신청 목록 조회
  getMyApplications: async () => {
    const response = await fetch(`${BASE_URL}/guest-recruitments/applications/my`);
    return response.json();
  },

  // 용병 신청자 목록 조회 (구단 관리자용)
  getRecruitmentApplications: async (recruitmentId) => {
    const response = await fetch(`${BASE_URL}/guest-recruitments/${recruitmentId}/applications`);
    return response.json();
  },

  // 용병 신청 상태 변경 (구단 관리자용)
  updateApplicationStatus: async (applicationId, status) => {
    const response = await fetch(`${BASE_URL}/guest-recruitments/applications/${applicationId}/status?status=${status}`, {
      method: 'PUT',
    });
    return response.json();
  },
};

export const getMercenaryRecDetail = async (id) => {
  const response = await fetch(`${BASE_URL}/guest-recruitments/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recruitment detail');
  }
  return response.json();
};

export const updateMercenaryRec = async (id, data) => {
  const response = await fetch(`${BASE_URL}/guest-recruitments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update recruitment');
  }
  return response.json();
};

export const applyMercenary = async (id) => {
  const response = await fetch(`${BASE_URL}/guest-recruitments/${id}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error('Failed to apply for recruitment');
  }
  return response.json();
}; 