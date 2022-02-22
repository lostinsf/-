import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { RouterFullscreenWrapper } from './styles';

type RouterFullscreenProps = {
  isOpen: boolean;
};

function RouterFullscreen(props: RouterFullscreenProps): JSX.Element {
  const { isOpen } = props;

  return <RouterFullscreenWrapper isOpen={isOpen} />;
}

export default memo(RouterFullscreen, IsEqual);
