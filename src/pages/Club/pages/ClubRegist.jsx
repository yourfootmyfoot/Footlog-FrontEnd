import useClubStore from '@/hooks/useClubStore'; // zustand store import
import { useState, useEffect } from 'react';
import styles from './ClubRegist.module.css'; // 외부 CSS 파일로 스타일을 관리.
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 사용

function ClubRegist() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  
  const { clubName, clubCode, setClubInfo } = useClubStore(); // 상태 업데이트 함수 불러오기

  // zustand에 저장된 값을 컴포넌트의 로컬 상태에 설정
  const [name, setName] = useState(clubName || '');
  const [code, setCode] = useState(clubCode || '');

  useEffect(() => {
    // 만약 zustand에 값이 있으면 로컬 상태에 설정
    if (clubName) setName(clubName);
    if (clubCode) setCode(clubCode);
  }, [clubName, clubCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClubInfo(name, code); // zustand 상태 업데이트
    navigate('/club/regist/schedule'); // 다음 페이지로 이동
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 ml-6 mr-6">
          <label className="block text-muted-foreground">구단 이름</label>
          <input
            type="text"
            className="border border-primary rounded-lg p-2 w-full"
            placeholder="구단 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-4 ml-6 mr-6">
          <label className="block text-muted-foreground">구단 코드</label>
          <input 
            type="text" 
            className="border border-primary rounded-lg p-2 w-full" 
            placeholder="구단 코드를 입력하세요" 
            value={code}
            onChange={(e) => setCode(e.target.value)} // 구단 코드 입력 시 상태 업데이트
          />
        </div>
        
        <p className="mt-4 ml-6 mr-6 text-sm text-muted-foreground">
          구단 URL 구단페이지 주소로 사용돼요<br />
          http://www.footlog.com/club/{code} {/* 구단 코드가 입력될 때마다 URL에 표시 */}
        </p>
        <div className='mt-4 ml-10 mr-6 text-sm text-muted-foreground w-full'>
        <button type="submit" className={styles.submitBtn}>다음</button>
        </div>
      </form>
  </>
  );
}

export default ClubRegist;