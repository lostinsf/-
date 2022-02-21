import Link from 'next/link';
import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { AboutWrapper, AboutContents, LinkContents } from './styles';

function About(): JSX.Element {
  return (
    <AboutWrapper isShow>
      <AboutContents>About페이지 입니다.</AboutContents>
      <Link href="/">
        <LinkContents>[CLICK] home으로 돌아가기</LinkContents>
      </Link>
      <Link href="/services">
        <LinkContents>[CLICK] services로 돌아가기</LinkContents>
      </Link>
    </AboutWrapper>
  );
}

export default memo(About, IsEqual);
