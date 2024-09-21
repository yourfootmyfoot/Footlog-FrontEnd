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
  white-space: normal;
  word-break: break-word;
  background-color: ${props => props.isSent ? '#16C79A' : '#F0F0F0'};
  color: ${props => props.isSent ? 'white' : 'black'};
  display: inline-block;
`;

const Time = styled.span`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  display: block;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isSent ? 'flex-end' : 'flex-start'};
`;

const ChatBubble = ({ message, time, isSent }) => {
  return (
    <BubbleWrapper isSent={isSent}>
      <ContentWrapper isSent={isSent}>
        <Bubble isSent={isSent}>
          {message}
        </Bubble>
        <Time>{time}</Time>
      </ContentWrapper>
    </BubbleWrapper>
  );
};

export default ChatBubble;