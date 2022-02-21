import Link from 'next/link';
import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { ServicesWrapper, ServicesContents, LinkContents } from './styles';

function Services(): JSX.Element {
  return (
    <ServicesWrapper isShow>
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
