import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { defaultTheme, zIndexes } from '@lib/styles';
import { motion } from 'framer-motion';

type CustomChatscreenProps = {
  isOpen: boolean;
};

export const CustomCharScreenWrapper = styled(motion.div)<CustomChatscreenProps>`
  background: ${defaultTheme.colors.white};
  color: ${defaultTheme.colors.black};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 30vh;
  width: 100%;
  max-width: 800px;
  max-height: 500px;
  z-index: ${zIndexes.customChatscreen};
  opacity: 0;
  visibility: none;
  transition: all 1s;
  padding: 20px;

  ${(props) =>
    props.isOpen &&
    css`
      width: 100%;
      opacity: 1;
      visibility: visible;
      transition: all 1s;
    `}
`;
