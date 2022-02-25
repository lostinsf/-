import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import CustomChatScreen from '@components/customChatscreen';
import CustomChatInput from '@components/customChatInput';
import { io } from 'socket.io-client';
import { ServicesWrapper, ServicesContents, LinkContents } from './styles';

function Services(): JSX.Element {
  // ignore eslint
  const socket = io('http://localhost:8080');

  const [chatData, setChatData] = useState<JSX.Element>(<div>채팅에 들어오신 것을 환영합니다.</div>);

  // socket.on('connect', () => {});
  // socket.on('disconnect', () => {});

  return (
    <ServicesWrapper isShow>
      <CustomChatScreen isOpen>{chatData}</CustomChatScreen>
      <CustomChatInput isOpen />
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
