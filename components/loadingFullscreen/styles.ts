import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { defaultTheme, zIndexes } from '@lib/styles';
import { motion } from 'framer-motion';

type LoadingWrapperProps = {
  isShow: boolean;
};

export const LoadingWrapper = styled(motion.div)<LoadingWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: 1;
  background: ${defaultTheme.colors.white};
  transform-origin: right;
  z-index: ${zIndexes.transitionFullscreen};
  visibility: visible;
  transition: all 1s;

  ${(props) =>
    !props.isShow &&
    css`
      width: 0vw;
      visibility: none;
      opacity: 0;
      transition: all 1s;
    `}

  .loadingLogoLine {
    position: absolute;
    top: calc(50% + 130px);
    left: calc(50% - 180px);
    width: 390px;
    height: 6px;
  }
`;

export const LoadingLogo = styled(motion.div)`
  position: absolute;
  top: calc(50% - 180px);
  left: calc(50% - 180px);
  width: 390px;
  height: 390px;
  display: flex;
  align-items: center;
  justify-contents: center;
`;

type LoadingLogoSvgProps = {
  isRotate: boolean;
  isDrawingLine: boolean;
};

export const LoadingLogoSvg = styled(motion.svg)<LoadingLogoSvgProps>`
  transition: all 0.5s;
  transform-origin: center;
  transform: rotate(30deg);

  ${(props) =>
    props.isRotate &&
    css`
      transform: none;
    `}

  ${(props) =>
    props.isDrawingLine &&
    css`
      stroke-dasharray: 450;
      stroke-dashoffset: 450;
      animation: draw 0.5s linear forwards;

      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}
`;

export const LoadingLogoPath = styled(motion.path)``;
