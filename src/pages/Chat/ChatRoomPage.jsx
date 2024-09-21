import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import ChatBubble from '@/components/ui/ChatBubble';
import BackIcon from '@/assets/back.svg';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  align-items: stretch;
`;

const ChatHeader = styled.div`
  padding: 10px 15px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0;
  padding: 5px 10px;
  border-radius: 15px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f8f8;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
`;

const SendButton = styled.button`
  background-color: #16C79A;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: #13A87E;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 8px 15px;
    font-size: 12px;
  }
`;

const ChatRoomPage = ({ history, match }) => {
  const roomId = parseInt(match.params.id);
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // 채팅방 데이터 (실제로는 API에서 가져와야 함)
  const chatRoomsData = {
    1: { name: '윤준수', messages: [
      { id: 1, text: '안녕하세요', time: '2:00pm', isSent: false },
      { id: 2, text: '반갑습니다', time: '2:05pm', isSent: true },
    ]},
    2: { name: '오택원', messages: [
      { id: 1, text: '이번 주 토요일 경기 장소 어디인가요?', time: '11:30am', isSent: false },
      { id: 2, text: '한강공원 축구장입니다.', time: '11:45am', isSent: true },
    ]},
  };

  useEffect(() => {
    const room = chatRoomsData[roomId];
    if (room) {
      setChatRoom(room);
      setMessages(room.messages);
    }
  }, [roomId]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  if (!chatRoom) {
    return <div>Loading...</div>;
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <BackButton onClick={() => history.goBack()}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L0.292894 8.29289C-0.0976312 8.68342 -0.0976312 9.31658 0.292894 9.70711L8.29289 17.7071C8.68342 18.0976 9.31658 18.0976 9.70711 17.7071C10.0976 17.3166 10.0976 16.6834 9.70711 16.2929L2.41421 9L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893Z" fill="black" fillOpacity="0.7"/>
          </svg>
        </BackButton>
        <Title>{chatRoom.name}</Title>
      </ChatHeader>
      <MessagesContainer>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            time={message.time}
            isSent={message.isSent}
          />
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={handleSend}>전송</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default withRouter(ChatRoomPage);