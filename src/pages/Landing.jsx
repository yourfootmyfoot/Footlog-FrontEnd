import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import mascotLogo from '@/assets/mascot.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  padding-bottom: calc(2rem + 80px);
  height: 100%;
  background: white;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  padding: 0 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ index }) => {
    const colors = [
      'rgba(236, 254, 255, 0.95)',
      'rgba(254, 243, 199, 0.95)',
      'rgba(237, 255, 236, 0.95)',
      'rgba(254, 242, 242, 0.95)'
    ];
    return colors[index % colors.length];
  }};
  border: 1px solid #e6e6e6;
  border-radius: 1rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 10px 20px rgba(22, 199, 154, 0.1),
      0 6px 6px rgba(0, 0, 0, 0.1),
      0 0 100px -20px rgba(22, 199, 154, 0.15);
    border-color: rgba(22, 199, 154, 0.3);
    background: white;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2d3748;
    position: relative;
    z-index: 1;
  }

  p {
    font-size: 0.8rem;
    color: #4A5568;
    text-align: center;
    margin: 0;
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }

  &:hover h3 {
    color: #16C79A;
  }

  &:hover p {
    color: #4A5568;
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
    box-shadow: 
      0 5px 10px rgba(22, 199, 154, 0.1),
      0 3px 3px rgba(0, 0, 0, 0.1);
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
      title: '구단 목록',
      description: '구단을 등록하고 관리하세요',
      path: '/clublist'
    },
    {
      title: '경기 목록',
      description: '등록된 경기의 상세 정보를 확인하세요',
      path: '/match'
    },
    {
      title: '용병 찾기',
      description: '용병을 구하거나 용병 신청을 할 수 있습니다',
      path: '/Mercenary'
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
            index={index}
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