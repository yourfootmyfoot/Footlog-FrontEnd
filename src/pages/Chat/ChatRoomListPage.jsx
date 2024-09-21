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
      name: '윤준수(논현동 무슨 팀 매니저)',
      avatar: '/api/placeholder/50/50',
      lastMessage: '다음 경기 티켓 예매하셨나요?',
      lastMessageTime: '오후 2:30'
    },
    {
      id: 2,
      name: '오택원(어디 팀 매니저)',
      avatar: '/api/placeholder/50/50',
      lastMessage: '한강공원 축구장입니다.',
      lastMessageTime: '오전 11:45'
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