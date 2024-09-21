import { useState } from 'react';
import styles from './ClubRegist.module.css'; // 외부 CSS 파일로 스타일을 관리.
import { useHistory } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 사용

function ClubRegist() {
  const [clubName, setClubName] = useState('');
  const [clubCode, setClubCode] = useState('');
  const history = useHistory(); // 페이지 이동을 위한 훅

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터를 처리하는 로직을 추가.
    console.log('구단 이름:', clubName);
    console.log('구단 코드:', clubCode);

    // 다음 페이지로 이동
    history.push('/club/regist/schedule'); // 페이지 이동
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 ml-6 mr-6">
          <label className="block text-muted-foreground">구단 이름</label>
          <input
            type="text"
            className="border border-primary rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-ring bg-accent text-accent-foreground"
            placeholder="구단 이름을 입력하세요"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>

        <div className="mt-4 ml-6 mr-6">
          <label className="block text-muted-foreground">구단 코드</label>
          <input 
            type="text" 
            className="border border-primary rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-ring bg-accent text-accent-foreground" 
            placeholder="구단 코드를 입력하세요" 
            value={clubCode}
            onChange={(e) => setClubCode(e.target.value)} // 구단 코드 입력 시 상태 업데이트
          />
        </div>
        
        <p className="mt-4 ml-6 mr-6 text-sm text-muted-foreground">
          구단 URL 구단페이지 주소로 사용돼요<br />
          http://www.footlog.com/club/{clubCode} {/* 구단 코드가 입력될 때마다 URL에 표시 */}
        </p>
        <button type="submit" className={styles.submitBtn}>다음</button>
      </form>
  </>
  );
}

export default ClubRegist;