import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { defaultTheme, zIndexes } from '@lib/styles';
import { motion } from 'framer-motion';

type CustomChatInputProps = {
  isOpen: boolean;
};

export const CustomCharInputWrapper = styled(motion.input)<CustomChatInputProps>`
  background: ${defaultTheme.colors.black};
  color: ${defaultTheme.colors.white};
  border-color: 1px solid ${defaultTheme.colors.white};
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 10vh;
  width: 100%;
  max-width: 800px;
  max-height: 100px;
  z-index: ${zIndexes.customChatInput};
  opacity: 0;
  visibility: none;
  transition: all 1s;

  ${(props) =>
    props.isOpen &&
    css`
      width: 100%;
      opacity: 1;
      visibility: visible;
      transition: all 1s;
    `}
`;
