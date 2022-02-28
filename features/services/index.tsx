import Link from 'next/link';
import { memo, useState, useCallback, useEffect } from 'react';
import IsEqual from 'react-fast-compare';
import CustomChatScreen from '@components/customChatscreen';
import CustomChatInput from '@components/customChatInput';
import { io } from 'socket.io-client';
import { ServicesWrapper, ServicesContents, LinkContents, ChatBalloonContents } from './styles';

// 채팅 전송시 주고 받는 오브젝트
type chatDataProps = {
  senderId: string;
  data: string;
};

// 소켓 접속 정보
const socket = io('http://localhost:8080');

function Services(): JSX.Element {
  // 채팅 관련 hook 함수
  const [isShow, setShow] = useState<boolean>(true);
  const [hasChatId, setChatID] = useState<string>('');
  const [isRight, setRight] = useState<boolean>(false);
  const [htmlChatData, setChatData] = useState<JSX.Element>(
    <ChatBalloonContents isRight={isRight}>채팅에 들어오신 것을 환영합니다.</ChatBalloonContents>,
  );
  const [hasChatPlaceHolder, setChatPlaceHolder] = useState<string>('(엔터키를 치면 채팅내용이 날라갑니다)');

  // 부모 키입력 함수
  const onChatDataSendKeyPress = useCallback(
    (e) => {
      const hasSenderId = hasChatId;
      const hasSenderData = e.target.value;

      if (hasSenderId === '') {
        const insertSenderData = htmlChatData && (
          <ChatBalloonContents isRight={isRight}>
            서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.
          </ChatBalloonContents>
        );
        setChatData(insertSenderData);
        return;
      }

      if (hasSenderData !== undefined && e.key === 'Enter') {
        socket.emit('messageS', { senderId: hasSenderId, senderData: hasSenderData });
      }
    },
    [htmlChatData],
  );

  // 부모 클릭 함수
  const onChatDataWriteClick = useCallback(() => {
    const hasSenderId = hasChatId;

    if (hasSenderId === '') {
      const insertSenderData = htmlChatData && (
        <ChatBalloonContents isRight={isRight}>
          서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.
        </ChatBalloonContents>
      );
      setChatData(insertSenderData);
    }
  }, [htmlChatData]);

  // 서버 효과 설정

  socket.on('connect', () => {
    if (socket === undefined) {
      const insertSenderData = htmlChatData && (
        <ChatBalloonContents isRight={isRight}>
          서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.
        </ChatBalloonContents>
      );
      setChatData(insertSenderData);
      return;
    }
    if (hasChatId === '') {
      setChatID(socket.id);
      const insertSenderData = htmlChatData && (
        <ChatBalloonContents isRight={isRight}>{socket.id}님이 서버에 접속되었습니다.</ChatBalloonContents>
      );
      setChatData(insertSenderData);
    }
  });

  // 서버로 부터 messageC를 받을 경우
  socket.on('messageC', (message) => {
    console.dir(message);
    console.log('message 이벤트를 받았습니다.');

    if (message.senderId === hasChatId) {
      setRight(true);
    }

    const insertSenderData = htmlChatData && (
      <ChatBalloonContents isRight={isRight}>
        {!isRight && message.senderId && ': '}
        {message.senderData}
      </ChatBalloonContents>
    );

    setChatData(insertSenderData);
  });

  // 서버로 부터 나갔을때
  socket.on('disconnect', () => {
    const insertSenderData = htmlChatData && (
      <ChatBalloonContents isRight={isRight}>접속이 종료되었습니다</ChatBalloonContents>
    );
    setChatData(insertSenderData);
  });
  return (
    <ServicesWrapper isShow>
      <CustomChatScreen isOpen>{htmlChatData}</CustomChatScreen>
      <CustomChatInput
        isOpen={isShow}
        hasPlaceHolder={hasChatPlaceHolder}
        ifOnKeyPress={(e) => onChatDataSendKeyPress(e)}
        ifOnClick={() => onChatDataWriteClick()}
      />
      <ServicesContents>Service페이지 입니다.</ServicesContents>
      <Link href="/">
        <LinkContents>[CLICK] home으로 돌아가기</LinkContents>
      </Link>
      <Link href="/about">
        <LinkContents>[CLICK] about로 돌아가기</LinkContents>
      </Link>
    </ServicesWrapper>
  );
}
export default memo(Services, IsEqual);
