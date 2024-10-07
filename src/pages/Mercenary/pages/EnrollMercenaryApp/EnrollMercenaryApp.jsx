import { useState } from 'react';
import './EnrollMercenaryApp.css'; // CSS 파일 분리

const EnrollMercenaryApp = () => {
  const [formData, setFormData] = useState({
    title: "",
    paragraphs: ["", "", "", ""],
    recruitmentDetails: ["", "", "", "", "", ""]
  });

  // 입력 핸들러
  const handleInputChange = (e, index, isParagraph) => {
    const { value } = e.target;

    if (isParagraph) {
      const updatedParagraphs = [...formData.paragraphs];
      updatedParagraphs[index] = value;
      setFormData((prev) => ({
        ...prev,
        paragraphs: updatedParagraphs
      }));
    } else {
      const updatedRecruitmentDetails = [...formData.recruitmentDetails];
      updatedRecruitmentDetails[index] = value;
      setFormData((prev) => ({
        ...prev,
        recruitmentDetails: updatedRecruitmentDetails
      }));
    }
  };

  return (
    <>
      <div className="form-group">
        <label className="label">경기 제목</label>
        <input 
          type="text" 
          value={formData.title} 
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
          className="input-field" 
          placeholder="모집글 제목을 입력해주세요."
        />
      </div>

      <div className="form-group">
        <label className="label">경기 날짜 및 시간</label>
        {/* datetime-local을 사용하여 날짜와 시간 선택 가능 */}
        <input
          type="datetime-local"
          value={formData.paragraphs[0]}
          onChange={(e) => handleInputChange(e, 0, true)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label className="label">경기 정보</label>
        {formData.paragraphs.slice(1).map((text, index) => (
          <input
            key={index}
            type="text"
            value={text}
            onChange={(e) => handleInputChange(e, index + 1, true)}
            className="input-field"
            placeholder={
              index === 0
                ? "경기 장소를 입력해주세요. (예: 울산 남구 문수월드컵경기장)"
                : index === 1
                ? "주소를 입력해주세요. (예: 울산광역시 남구 문수로 44)"
                : "참가비와 시간을 입력해주세요. (예: 참가비 무료 / 2시간)"
            }
          />
        ))}
      </div>

      <div className="form-group">
        <label className="label">모집 세부사항</label>
        {formData.recruitmentDetails.map((text, index) => (
          <input
            key={index}
            type="text"
            value={text}
            onChange={(e) => handleInputChange(e, index, false)}
            className="input-field"
            placeholder={
              index === 0
                ? "경기 형태를 입력해주세요. (예: 11 vs 11)"
                : index === 1
                ? "실력 수준을 입력해주세요. (예: 세미프로~프로)"
                : index === 2
                ? "연령 제한을 입력해주세요. (예: 나이 무관)"
                : index === 3
                ? "성별 제한을 입력해주세요. (예: 여자만)"
                : index === 4
                ? "경기 시간을 입력해주세요. (예: 60분 이상 보장)"
                : "모집 인원을 입력해주세요. (예: 필드 3명 모집)"
            }
          />
        ))}
      </div>

      <div className="application-section">
        <button className="apply-button">신청하기</button>
      </div>
    </>
  );
};

export default EnrollMercenaryApp;
