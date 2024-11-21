import { useState } from 'react';
import axios from 'axios';
import './Qna.css';

const Qna = () => {
  // 문의 제목과 내용 상태 관리
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // 제출 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '' || message.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      // POST 요청 보내기
      const response = await axios.post('http://localhost:8080/api/ask', {
        title, // 요청 본문에 제목 전달
        message, // 요청 본문에 내용 전달
      });

      console.log('응답 데이터:', response.data);
      alert('문의가 성공적으로 제출되었습니다.');

      // 제출 후 입력 필드 초기화
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('문의 제출 중 오류 발생:', error);
      alert('문의 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="contact-admin-container">
      <h2 className="contact-admin-title">관리자에게 1:1 문의하기</h2>
      <form className="contact-admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="contact-admin-input"
          placeholder="문의 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="contact-admin-textarea"
          placeholder="문의 내용을 입력하세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="contact-admin-button">
          문의하기
        </button>
      </form>
    </div>
  );
};

export default Qna;
