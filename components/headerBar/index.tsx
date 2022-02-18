import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { useRouter } from 'next/router';
import { HeaderBarContainer, HeaderBarWrapper, HeaderBarSimbol, HeaderBarLogo } from './styles';

function HeaderBar(): JSX.Element {
  const router = useRouter();

  const onHeaderBarClick = () => {
    router.push('/');
  };

  return (
    <HeaderBarWrapper>
      <HeaderBarContainer>
        <HeaderBarSimbol onClick={() => onHeaderBarClick()} />
        <HeaderBarLogo onClick={() => onHeaderBarClick()} />
      </HeaderBarContainer>
    </HeaderBarWrapper>
  );
}

export default memo(HeaderBar, IsEqual);
