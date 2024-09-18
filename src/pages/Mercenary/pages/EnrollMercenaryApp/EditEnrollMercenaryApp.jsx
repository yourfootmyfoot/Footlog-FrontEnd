import React, { useState } from 'react';
import './EditEnrollMercenaryApp.css'; // CSS 파일 분리

// 모달 컴포넌트
const Modal = ({ show, onClose, options, onSelect, isMap }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {isMap ? (
          <div>
            <h2>지도보기</h2>
            <img
              src="your-map-image-url-here"
              alt="Map"
              className="map-image"
            />
            <button onClick={onClose} className="close-button">닫기</button>
          </div>
        ) : (
          <div>
            <h2>옵션을 선택하세요</h2>
            <ul>
              {options.map((option, index) => (
                <li key={index} onClick={() => onSelect(option)} className="option-item">
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={onClose} className="close-button">닫기</button>
          </div>
        )}
      </div>
    </div>
  );
};

const EditEnrollMercenaryApp = () => {
  const [userName] = useState("탱구와울라숑"); // 기본 유저 이름 설정
  const [paragraphs, setParagraphs] = useState([
    "8월 8일 목요일 20:00",
    "울산 남구 문수월드컵경기장",
    "울산광역시 남구 문수로 44",
    "참가비 무료 / 2시간"
  ]);

  const [recruitmentDetails, setRecruitmentDetails] = useState([
    "11 vs 11",
    "세미프로~프로",
    "나이 무관",
    "여자만",
    "60분 이상 보장",
    "필드 3명 모집"
  ]);

  const [title, setTitle] = useState("용병 모집합니다!"); // 모집 게시글 제목 상태 추가

  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isParagraph, setIsParagraph] = useState(true);
  const [isMap, setIsMap] = useState(false);

  const handleTextClick = (index, isParagraph) => {
    setCurrentIndex(index);
    setIsParagraph(isParagraph);
    setIsMap(false);
    setShowModal(true);

    if (isParagraph) {
      if (index === 0) {
        setCurrentOptions(["7월 7일 목요일 20:00", "8월 8일 목요일 20:00", "9월 9일 목요일 20:00"]);
      } else if (index === 1) {
        setCurrentOptions(["서울 월드컵 경기장", "부산 구덕 경기장", "울산 문수 경기장"]);
      } else if (index === 2) {
        setCurrentOptions(["울산광역시 남구 문수로 44", "서울특별시 마포구 상암동 515", "부산광역시 연제구 월드컵대로 344"]);
      } else if (index === 3) {
        setCurrentOptions(["참가비 무료 / 2시간", "참가비 5,000원 / 2시간", "참가비 10,000원 / 2시간"]);
      }
    } else {
      if (index === 0) {
        setCurrentOptions(["11 vs 11", "7 vs 7", "5 vs 5"]);
      } else if (index === 1) {
        setCurrentOptions(["세미프로~프로", "아마추어", "초보자"]);
      } else if (index === 2) {
        setCurrentOptions(["나이 무관", "20대 이하", "30대 이상"]);
      } else if (index === 3) {
        setCurrentOptions(["여자만", "남자만", "성별 무관"]);
      } else if (index === 4) {
        setCurrentOptions(["60분 이상 보장", "30분 이상 보장", "전체 경기 시간 보장"]);
      } else if (index === 5) {
        setCurrentOptions(["필드 3명 모집", "필드 5명 모집", "필드 7명 모집"]);
      }
    }
  };

  const handleMapClick = () => {
    setIsMap(true);
    setShowModal(true);
  };

  const handleOptionSelect = (option) => {
    if (isParagraph) {
      const updatedParagraphs = [...paragraphs];
      updatedParagraphs[currentIndex] = option;
      setParagraphs(updatedParagraphs);
    } else {
      const updatedRecruitmentDetails = [...recruitmentDetails];
      updatedRecruitmentDetails[currentIndex] = option;
      setRecruitmentDetails(updatedRecruitmentDetails);
    }
    setShowModal(false);
  };

  return (
    <div className="container">
      {/* 이미지 섹션 */}
      <div className="image-container">
        <img
          src="your-image-url-here"
          alt="Event"
          className="event-image"
        />
      </div>

      {/* 이벤트 정보 */}
      <div className="event-info">
        {paragraphs.map((text, index) => (
          <p key={index} onClick={() => handleTextClick(index, true)} className="clickable-text">
            {text}
          </p>
        ))}
        {/* 지도보기 버튼 */}
        <button onClick={handleMapClick} className="map-button">지도보기</button>
      </div>

      {/* 모집 세부사항 */}
      <div className="recruitment">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="title-input"
        />
        <div className="recruitment-details">
          <div className="host">
            <img src="your-host-image-url-here" alt="host" className="host-image" />
            <p className="host-name">호스트: {userName}</p>
          </div>
          <div className="recruitment-options">
            {recruitmentDetails.map((text, index) => (
              <p key={index} onClick={() => handleTextClick(index, false)} className="clickable-text">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* 수정 버튼 */}
      <div className="application-section">
        <button className="apply-button">수정하기</button>
      </div>

      {/* 모달 창 */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        options={currentOptions}
        onSelect={handleOptionSelect}
        isMap={isMap}
      />
    </div>
  );
};

export default EditEnrollMercenaryApp;
