import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { CustomCharScreenWrapper } from './styles';

type CustomChatScreenProps = {
  isOpen: boolean;
};

function CustomChatScreen(props: CustomChatScreenProps): JSX.Element {
  const { isOpen } = props;

  return <CustomCharScreenWrapper isOpen={isOpen} />;
}

export default memo(CustomChatScreen, IsEqual);
