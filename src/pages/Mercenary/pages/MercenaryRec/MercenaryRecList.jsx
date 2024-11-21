import { useState, useEffect } from 'react';
import { getMercenaryRecList } from '../../apis/MercenaryAPI';
import MercenaryRecInfo from './MercenaryRecInfo';
import MercenaryRec from './MercenaryRecList.module.css';
import EnrollMerButton from '../../EnrollMerButton';
import styled from '@emotion/styled';

function MercenaryRecList() {
  const [mercenaryRecList, setMercenaryRecList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        setLoading(true);
        const data = await getMercenaryRecList();
        setMercenaryRecList(data);
        setError(null);
      } catch (err) {
        setError('모집글을 불러오는데 실패했습니다.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  const ListContainer = styled.div`
    width: 100%;
    padding: 2vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `;

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>로딩중...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <>
      <ListContainer>
        <div className={MercenaryRec.container}>
          {mercenaryRecList.length > 0 ? (
            mercenaryRecList.map(mercenary => (
              <MercenaryRecInfo
                key={mercenary.id}
                mercenary={mercenary}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              등록된 모집글이 없습니다.
            </div>
          )}
        </div>
        <EnrollMerButton />
      </ListContainer>
    </>
  );
}

export default MercenaryRecList;