import styled from '@emotion/styled';

const BubbleWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.isSent ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
  width: 100%;
`;

const Bubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  background-color: ${props => props.isSent ? '#16C79A' : '#F0F0F0'};
  color: ${props => props.isSent ? 'white' : 'black'};
  align-self: ${props => props.isSent ? 'flex-end' : 'flex-start'};
`;

const Time = styled.span`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  align-self: ${props => props.isSent ? 'flex-end' : 'flex-start'};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatBubble = ({ message, time, isSent }) => {
  return (
    <BubbleWrapper isSent={isSent}>
      <ContentWrapper>
        <Bubble isSent={isSent}>
          {message}
        </Bubble>
        <Time isSent={isSent}>{time}</Time>
      </ContentWrapper>
    </BubbleWrapper>
  );
};

export default ChatBubble;