import { KeyboardEvent, memo, MouseEvent } from 'react';
import IsEqual from 'react-fast-compare';
import { CustomCharInputWrapper } from './styles';

type CustomChatInputProps = {
  isOpen: boolean;
  hasPlaceHolder: string;
  ifOnKeyPress: (value: string) => void;
  ifOnClick: (value: string) => void;
};

function CustomChatInput(props: CustomChatInputProps): JSX.Element {
  // 매개변수 가져오기
  const { isOpen, hasPlaceHolder, ifOnKeyPress, ifOnClick } = props;

  // 키 입력 함수 (부모 키입력 함수 필요)
  const onCustomChatInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const onInputKey = e.key;

    if (onInputKey === 'Enter') {
      ifOnKeyPress(e);
      e.target.value = '';
    }
  };

  // 클릭 감지 함수 (부모 클릭 함수 필요)
  const onCustomChatInputClick = (e: MouseEvent<HTMLInputElement>) => {
    const onInputValue = e.target.value;
    if (onInputValue !== undefined) {
      ifOnClick(onInputValue);
    }
  };

  return (
    <CustomCharInputWrapper
      isOpen={isOpen}
      placeholder={hasPlaceHolder}
      onKeyPress={(e) => onCustomChatInputKeyPress(e)}
      onClick={(e) => onCustomChatInputClick(e)}
    />
  );
}

export default memo(CustomChatInput, IsEqual);
