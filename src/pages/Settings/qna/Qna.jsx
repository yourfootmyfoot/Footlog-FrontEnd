import React, { useState } from 'react';
import './Qna.css';

const Qna = () => {
  // 문의 제목과 내용 상태 관리
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // 제출 버튼 클릭 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || message.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 문의 내용을 처리하는 로직 (API 호출 등)
    console.log('문의 제목:', title);
    console.log('문의 내용:', message);
    alert('문의가 성공적으로 제출되었습니다.');

    // 제출 후 입력 필드 초기화
    setTitle('');
    setMessage('');
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
