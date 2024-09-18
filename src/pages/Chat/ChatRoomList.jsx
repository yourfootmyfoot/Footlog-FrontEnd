import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const ChatRoomListContainer = styled.div`
  padding: 10px;
`;

const ChatRoomItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const ChatInfo = styled.div`
  flex: 1;
`;

const ChatName = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const LastMessage = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #757575;
`;

const ChatTime = styled.span`
  font-size: 12px;
  color: #9e9e9e;
`;

const ChatRoomList = ({ chatRooms }) => {
  return (
    <ChatRoomListContainer>
      {chatRooms.map((room) => (
        <ChatRoomItem key={room.id} to={`/chat/${room.id}`}>
          <Avatar src={room.avatar} alt={room.name} />
          <ChatInfo>
            <ChatName>{room.name}</ChatName>
            <LastMessage>{room.lastMessage}</LastMessage>
          </ChatInfo>
          <ChatTime>{room.lastMessageTime}</ChatTime>
        </ChatRoomItem>
      ))}
    </ChatRoomListContainer>
  );
};

export default ChatRoomList;