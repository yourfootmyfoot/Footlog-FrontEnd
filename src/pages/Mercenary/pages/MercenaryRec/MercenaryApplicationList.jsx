import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MercenaryApplicationList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 신청 목록 조회
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8080/api/guest-recruitments/${id}/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('신청 목록을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 신청 상태 업데이트
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(
        `http://localhost:8080/api/guest-recruitments/applications/${applicationId}/status?status=${newStatus}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('상태 업데이트에 실패했습니다.');
      }

      // 목록 새로고침
      fetchApplications();
      alert('상태가 업데이트되었습니다.');
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [id]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">용병 신청 목록</h1>
      
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            아직 신청한 용병이 없습니다.
          </div>
        ) : (
          applications.map((application) => (
            <div 
              key={application.id} 
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">
                    {application.applicant.nickname}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    신청일: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {application.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'APPROVED')}
                        className="px-4 py-2 bg-[rgba(22,199,154,0.3)] text-[#16C79A] rounded-lg hover:bg-[rgba(22,199,154,0.4)] transition-colors"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        거절
                      </button>
                    </>
                  )}
                  {application.status === 'APPROVED' && (
                    <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
                      승인됨
                    </span>
                  )}
                  {application.status === 'REJECTED' && (
                    <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg">
                      거절됨
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default MercenaryApplicationList; 