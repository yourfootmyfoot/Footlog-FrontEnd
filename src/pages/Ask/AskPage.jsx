import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 사용
import styles from './AskPage.module.css';

const AskPage = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('default');
  const [inquiries, setInquiries] = useState([]); // 초기값 비워두기
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  // 데이터 가져오기
  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:8080/api/ask'); // 서버 API URL
        setInquiries(response.data); // 서버에서 받은 데이터로 상태 업데이트
      } catch (err) {
        console.error('문의 데이터를 가져오는 중 오류 발생:', err);
        setError('문의 데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // 정렬 방식에 따라 데이터를 정렬
  const sortInquiries = () => {
    let sortedInquiries = [...inquiries];
    if (sortOption === 'userId') {
      sortedInquiries.sort((a, b) => a.userId.localeCompare(b.userId));
    } else if (sortOption === 'answered') {
      sortedInquiries.sort((a, b) => (a.answered === b.answered ? 0 : a.answered ? -1 : 1));
    }
    return sortedInquiries;
  };

  // 문의 항목 클릭 시 답변 페이지로 이동
  const handleInquiryClick = (id) => {
    navigate(`ask/answer/${id}`); // 문의 ID를 기반으로 답변 페이지로 이동
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>문의 내역</h2>

      {/* 정렬 옵션 선택 리스트 */}
      <div className={styles.sortOptions}>
        <label htmlFor="sort" className={styles.sortLabel}>정렬 기준: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.select}
        >
          <option value="default">기본</option>
          <option value="userId">유저 아이디</option>
          <option value="answered">답변 여부</option>
        </select>
      </div>

      {/* 정렬된 문의 리스트 */}
      {sortInquiries().map((inquiry) => (
        <div
          key={inquiry.id}
          className={`${styles.inquiryItem} ${inquiry.answered ? styles.answeredItem : ''}`}
          onClick={() => handleInquiryClick(inquiry.id)}
        >
          <div className={styles.inquiryHeader}>
            <h3 className={styles.inquiryTitle}>{inquiry.title}</h3>
            <span className={styles.inquiryDate}>{inquiry.date}</span>
          </div>
          <p className={styles.inquiryCategory}>카테고리: {inquiry.category}</p>
          <p className={styles.inquiryMessage}>{inquiry.message}</p>
          <p className={styles.inquiryUserId}>유저 아이디: {inquiry.userId}</p>
          <p className={`${styles.inquiryStatus} ${inquiry.answered ? styles.answered : styles.notAnswered}`}>
            {inquiry.answered ? '답변 완료' : '답변 대기 중'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AskPage;
