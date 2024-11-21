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
        console.log('받아온 데이터:', data);
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
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  `;

  const Header = styled.div`
    width: 100%;
    max-width: 700px;
    margin-bottom: 24px;
    text-align: center;
  `;

  const Title = styled.h1`
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 8px;
  `;

  const Subtitle = styled.p`
    color: #718096;
    font-size: 1rem;
  `;

  const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #2ecc71;
    font-size: 1.2rem;
  `;

  if (loading) return <LoadingSpinner>로딩중...</LoadingSpinner>;
  if (error) return <div style={{ textAlign: 'center', padding: '20px', color: '#e53e3e' }}>{error}</div>;

  return (
    <ListContainer>
      <Header>
        <Title>용병 모집</Title>
      </Header>
      <div className={MercenaryRec.container}>
        {mercenaryRecList.length > 0 ? (
          mercenaryRecList.map(recruitment => (
            <MercenaryRecInfo
              key={recruitment.id}
              recruitment={recruitment}
            />
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#718096',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            등록된 모집글이 없습니다.
          </div>
        )}
      </div>
      <EnrollMerButton />
    </ListContainer>
  );
}

export default MercenaryRecList;