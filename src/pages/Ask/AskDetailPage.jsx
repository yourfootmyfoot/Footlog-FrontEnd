import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './AskDetailPage.module.css';

const AskDetailPage = () => {
  const { id } = useParams(); // URL에서 문의 ID 가져오기
  const [inquiry, setInquiry] = useState(null); // 문의 데이터 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchInquiry = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8080/api/ask/${id}`); // 문의 ID를 기반으로 요청
        setInquiry(response.data); // 요청 성공 시 데이터 설정
      } catch (err) {
        console.error('문의 데이터를 가져오는 중 오류 발생:', err);
        setError('문의 데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {inquiry ? (
        <div className={styles.inquiryDetails}>
          <h2 className={styles.title}>{inquiry.title}</h2>
          
          <div className={styles.detailSection}>
            <span className={styles.label}>문의자:</span>
            <span className={styles.value}>{inquiry.user}</span>
          </div>
          
          <div className={styles.detailSection}>
            <span className={styles.label}>문의 날짜:</span>
            <span className={styles.value}>{inquiry.date}</span>
          </div>

          <div className={styles.detailSection}>
            <span className={styles.label}>카테고리:</span>
            <span className={styles.value}>{inquiry.category}</span>
          </div>

          <div className={styles.detailSection}>
            <span className={styles.label}>문의 내용:</span>
            <span className={styles.message}>{inquiry.message}</span>
          </div>

          {inquiry.answered && (
            <div className={styles.detailSection}>
              <span className={styles.label}>관리자 답변:</span>
              <span className={styles.response}>{inquiry.response}</span>
            </div>
          )}

          <div className={styles.statusSection}>
            <span className={`${styles.status} ${inquiry.answered ? styles.answered : styles.notAnswered}`}>
              {inquiry.answered ? '답변 완료' : '답변 대기 중'}
            </span>
          </div>
        </div>
      ) : (
        <p>문의 내역을 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default AskDetailPage;
