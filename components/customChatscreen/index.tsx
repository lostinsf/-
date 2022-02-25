import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { CustomCharScreenWrapper } from './styles';

type CustomChatScreenProps = {
  isOpen: boolean;
  children: JSX.Element;
};

function CustomChatScreen(props: CustomChatScreenProps): JSX.Element {
  const { isOpen, children } = props;

  return <CustomCharScreenWrapper isOpen={isOpen}>{children}</CustomCharScreenWrapper>;
}

export default memo(CustomChatScreen, IsEqual);
