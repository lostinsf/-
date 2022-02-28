import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { CustomCharScreenWrapper } from './styles';

type CustomChatScreenProps = {
  isOpen: boolean;
  children: JSX.Element;
};

function CustomChatScreen(props: CustomChatScreenProps): JSX.Element {
  const { isOpen, children } = props;

  return (
    <Scrollbars>
      <CustomCharScreenWrapper isOpen={isOpen}>{children}</CustomCharScreenWrapper>
    </Scrollbars>
  );
}

export default memo(CustomChatScreen, IsEqual);
