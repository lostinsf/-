import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { CustomCharInputWrapper } from './styles';

type CustomChatInputProps = {
  isOpen: boolean;
};

function CustomChatInput(props: CustomChatInputProps): JSX.Element {
  const { isOpen } = props;

  return <CustomCharInputWrapper isOpen={isOpen} />;
}

export default memo(CustomChatInput, IsEqual);
