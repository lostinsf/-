import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { useRouter } from 'next/router';
import HamburgerButton from '../hamburgerButton';
import { HeaderContainer, HeaderWrapper, HeaderLefeMenu, HeaderLogo } from './styles';

function Header(): JSX.Element {
  const router = useRouter();

  const onHeaderLeftMenuClick = () => {
    router.push('/services');
  };

  const onHeaderLogoClick = () => {
    router.push('/');
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderLefeMenu onClick={() => onHeaderLeftMenuClick()}>Contact</HeaderLefeMenu>
          <HeaderLogo onClick={() => onHeaderLogoClick()} />
        </HeaderContainer>
      </HeaderWrapper>
      <HamburgerButton />
    </>
  );
}

export default memo(Header, IsEqual);
