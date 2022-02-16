import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { useRecoilValue } from 'recoil';
import { Header } from '@components/index';
import { menuAtom } from '@lib/recoil';
import { HamburgerFullscreen } from './styles';

type BaseLayoutProps = {
  children: JSX.Element;
};

function BaseLayout(props: BaseLayoutProps): JSX.Element {
  const { children } = props;
  const menuState = useRecoilValue(menuAtom);

  return (
    <>
      <Header />
      {children}
      <HamburgerFullscreen isHamburgerOpen={menuState.isHamburgerOpen} />
    </>
  );
}

export default memo(BaseLayout, IsEqual);
