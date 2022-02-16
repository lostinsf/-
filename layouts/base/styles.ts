import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { defaultTheme, zIndexes } from '@lib/styles';
import { motion } from 'framer-motion';

type HamburgerFullscreenProps = {
  isHamburgerOpen: boolean;
};

export const HamburgerFullscreen = styled(motion.div)<HamburgerFullscreenProps>`
  background: ${defaultTheme.colors.purple};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  z-index: ${zIndexes.hamburegerFullscreen};
  opacity: 0;
  visibility: none;
  transition: all 1s;

  ${(props) =>
    props.isHamburgerOpen &&
    css`
      width: 100%;
      opacity: 1;
      visibility: visible;
      transition: all 1s;
    `}
`;
