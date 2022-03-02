import Link from 'next/link';
import { memo, useState, useCallback, useEffect } from 'react';
import IsEqual from 'react-fast-compare';
import CustomChatScreen from '@components/customChatscreen';
import CustomChatInput from '@components/customChatInput';
import { io } from 'socket.io-client';
import { useRecoilState } from 'recoil';
import { chatAtom } from '@lib/recoil';
import { ServicesWrapper, ServicesContents, LinkContents, ChatBalloonContents } from './styles';
import { SOCKET_EVENT } from './interface';

// 채팅 전송시 주고 받는 오브젝트
type chatDataProps = {
  senderId: string;
  data: string;
};

export const socket = io(String(process.env.CHATING_SERVER_URL), { withCredentials: true });

function Services(): JSX.Element {
  // 변수 정리
  const [hasChatId, setChatID] = useRecoilState(chatAtom);
  const [isShow, setShow] = useState<boolean>(true);
  const [htmlChatData, setChatData] = useState<JSX.Element>(
    <ChatBalloonContents isLeft>채팅에 들어오신 것을 환영합니다.</ChatBalloonContents>,
  );
  const hasChatPlaceHolder = '(엔터키를 치면 채팅내용이 날라갑니다)';

  // socket 종료시 적용
  useEffect(
    () =>
      // 소켓 접속 정보
      () => {
        socket.disconnect();
      },
    [],
  );

  // 처음로그인시 접속 알림
  useEffect(() => {
    console.log('아이디 체크');
    if (hasChatId.hasChatId === '') {
      setChatID({ hasChatId: socket.id });
    }

    const hasSenderId = hasChatId.hasChatId;
    socket.emit(SOCKET_EVENT.JOIN_MESSAGE, { senderId: hasSenderId }); // JOIN_ROOM event type과 nickname data를 서버에 전송한다.
  }, [hasChatId]);

  // 부모 키입력 함수
  const onChatDataSendKeyPress = useCallback(
    (e) => {
      const hasSenderId = hasChatId.hasChatId;
      const hasSenderData = e.target.value;

      if (hasSenderId === '') {
        const insertSenderData = (
          <>
            {htmlChatData}
            <ChatBalloonContents isLeft>서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.</ChatBalloonContents>
          </>
        );
        setChatData(insertSenderData);
        return;
      }

      if (hasSenderData !== undefined && e.key === 'Enter') {
        socket.emit(SOCKET_EVENT.SEND_MESSAGE, { senderId: hasSenderId, senderData: hasSenderData });
        const insertSenderData = (
          <>
            {htmlChatData}
            <ChatBalloonContents>{hasSenderData}</ChatBalloonContents>
          </>
        );
        setChatData(insertSenderData);
      }
    },
    [htmlChatData],
  );

  // 부모 클릭 함수
  const onChatDataWriteClick = useCallback(() => {
    const hasSenderId = hasChatId.hasChatId;

    if (hasSenderId === '') {
      const insertSenderData = (
        <>
          {htmlChatData}
          <ChatBalloonContents isLeft>서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.</ChatBalloonContents>
        </>
      );
      setChatData(insertSenderData);
    }
  }, [htmlChatData]);

  socket.on('connect', () => {
    if (socket === undefined) {
      const insertSenderData = (
        <>
          {htmlChatData}
          <ChatBalloonContents isLeft>서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.</ChatBalloonContents>
        </>
      );
      setChatData(insertSenderData);
    }
  });

  // 서버로 부터 알림메세지를 받을 경우
  socket.on(SOCKET_EVENT.ALERT_MESSAGE, (message: { senderId: string }) => {
    console.dir(message);
    console.log(`${SOCKET_EVENT.ALERT_MESSAGE} message 이벤트를 받았습니다.`);

    const insertSenderData = (
      <>
        {htmlChatData}
        <ChatBalloonContents isLeft>{message.senderId}님이 서버에 접속되었습니다.</ChatBalloonContents>
      </>
    );
    setChatData(insertSenderData);
  });

  // 서버로 부터 채팅메세지를 받은 경우
  socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, (message: { senderId: string; senderData: string }) => {
    console.dir(message);
    console.log(`${SOCKET_EVENT.RECEIVE_MESSAGE} message 이벤트를 받았습니다.`);

    if (message.senderId !== hasChatId.hasChatId) {
      const insertSenderData = (
        <>
          {htmlChatData}
          <ChatBalloonContents isLeft>
            {message.senderId} : {message.senderData}
          </ChatBalloonContents>
        </>
      );
      setChatData(insertSenderData);
    }
  });

  // 서버로 부터 나갔을때
  socket.on('disconnect', () => {
    if (hasChatId.hasChatId !== '') {
      setChatID({ hasChatId: '' });
    }
    const insertSenderData = (
      <>
        {htmlChatData}
        <ChatBalloonContents isLeft>접속이 종료되었습니다</ChatBalloonContents>
      </>
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
