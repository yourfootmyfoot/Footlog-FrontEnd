import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import mascotLogo from '@/assets/mascot.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  padding-bottom: calc(2rem + 80px);
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  overflow-y: auto;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    background: #16C79A;
    color: white;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
    margin: 0;
  }

  &:hover p {
    color: #f0f0f0;
  }
`;

const Landing = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: '로그인',
      description: '서비스를 이용하기 위해 로그인해주세요',
      path: '/login'
    },
    {
      title: '경기 등록',
      description: '새로운 경기를 등록하고 관리하세요',
      path: '/match/enroll'
    },
    {
      title: '경기 상세',
      description: '등록된 경기의 상세 정보를 확인하세요',
      path: '/matchDetail'
    },
    {
      title: '용병 찾기',
      description: '용병을 구하거나 용병 신청을 할 수 있습니다',
      path: '/Mercenary'
    },
    {
      title: '용병 모집',
      description: '새로운 용병 모집 공고를 등록하세요',
      path: '/EnrollMercenaryRec'
    }
  ];

  return (
    <Container className="main-container">
      <Logo src={mascotLogo} alt="FootLog Logo" />
      <Title>FootLog에 오신 것을 환영합니다</Title>
      <CardGrid>
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => navigate(card.path)}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default Landing;