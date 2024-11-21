import { useState, useEffect } from 'react';
import { getMercenaryRecList } from '../../apis/MercenaryAPI';
import MercenaryRecInfo from './MercenaryRecInfo';
import MercenaryRec from './MercenaryRecList.module.css';
import EnrollMerButton from '../../EnrollMerButton';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

function MercenaryRecList() {
  const [mercenaryRecList, setMercenaryRecList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        setLoading(true);
        const data = await getMercenaryRecList();
        if (!data) {
          throw new Error('데이터를 불러올 수 없습니다.');
        }
        setMercenaryRecList(data);
        setError(null);
      } catch (err) {
        setError('모집글을 불러오는데 실패했습니다.');
        console.error('Error details:', err);
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

  const ListItem = styled.div`
    width: 100%;
    max-width: 700px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
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
            <ListItem key={recruitment.id} onClick={() => navigate(`/mercenary/recruitment/${recruitment.id}`)}>
              <div className="flex flex-col gap-2">
                <MercenaryRecInfo
                  recruitment={recruitment}
                />
              </div>
            </ListItem>
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