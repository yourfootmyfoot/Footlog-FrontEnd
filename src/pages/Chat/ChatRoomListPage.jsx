import styled from '@emotion/styled';
import ChatRoomList from './ChatRoomList'; 

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ChatRoomListPage = () => {
  // 이 데이터는 나중에 API에서 가져올 수 있습니다.
  const mockChatRooms = [
    {
      id: 1,
      name: 'FC 서울 팬 모임',
      avatar: '/api/placeholder/50/50',
      lastMessage: '다음 경기 티켓 예매하셨나요?',
      lastMessageTime: '오후 2:30'
    },
    {
      id: 2,
      name: '주말 축구 동호회',
      avatar: '/api/placeholder/50/50',
      lastMessage: '이번 주 토요일 경기 참석 여부 알려주세요.',
      lastMessageTime: '오전 11:45'
    },
    {
      id: 3,
      name: '축구 전술 연구회',
      avatar: '/api/placeholder/50/50',
      lastMessage: '새로운 포메이션에 대해 의견 나눠봐요.',
      lastMessageTime: '어제'
    },
  ];

  return (
    <PageContainer>
      <Title>채팅</Title>
      <ChatRoomList chatRooms={mockChatRooms} />
    </PageContainer>
  );
};

export default ChatRoomListPage;