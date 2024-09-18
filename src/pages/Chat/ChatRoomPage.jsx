import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatBubble from './ChatBubble';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background-color: #fff;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: ${props => props.showText ? '20px' : '50%'};
  width: ${props => props.showText ? 'auto' : '40px'};
  height: 40px;
  font-size: 1.2rem;
  padding: ${props => props.showText ? '0 15px' : '0'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요', time: '12:27pm', isSent: false },
    { id: 2, text: '평균나이대가 궁금합니다.', time: '12:27pm', isSent: true },
    { id: 3, text: '그런게 왜 궁금하세요', time: '2:00pm', isSent: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [showSendText, setShowSendText] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowSendText(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <BackButton>&lt;</BackButton>
        <Title>채팅</Title>
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
        <SendButton onClick={handleSend} showText={showSendText}>
          {showSendText ? '전송' : '>'}
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatRoom;