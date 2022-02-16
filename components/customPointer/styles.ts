import styled from '@emotion/styled';
import { zIndexes } from '@lib/styles';

type CursorDotProps = {
  $dotSize: number;
  $color: string;
  $mixBlend: boolean;
  $x: number;
  $y: number;
  $scale: number;
};
export const CursorDot = styled.div<CursorDotProps>`
  width: ${({ $dotSize }) => `${$dotSize}px`};
  height: ${({ $dotSize }) => `${$dotSize}px`};
  position: absolute;
  background-color: ${({ $color }) => $color};
  z-index: ${zIndexes.customPointer};
  border-radius: 100%;
  pointer-events: none;
  overflow: auto;
  mix-blend-mode: ${({ $mixBlend }) => ($mixBlend ? 'difference' : 'none')};
  transform: ${({ $x, $y, $scale }) => `translate(${$x}px, ${$y}px) scale(${$scale})`};
`;

type CursorRingProps = {
  $dotSize: number;
  $ringSize: number;
  $color: string;
  $mixBlend: boolean;
  $transitionTime: number;
  $x: number;
  $y: number;
  $scale: number;
};
export const CursorRing = styled.div<CursorRingProps>`
  width: ${({ $ringSize }) => `${$ringSize}px`};
  height: ${({ $ringSize }) => `${$ringSize}px`};
  border-radius: 100%;
  background-color: ${({ $color }) => $color};
  opacity: 0.6;
  transition: ${({ $transitionTime }) => `transform ${$transitionTime}ms ease-out`};
  pointer-events: none;
  z-index: ${zIndexes.customPointer};
  position: absolute;
  mix-blend-mode: ${({ $mixBlend }) => ($mixBlend ? 'difference' : 'none')};
  display: block;
  transform: ${({ $dotSize, $ringSize, $x, $y, $scale }) => `translate(
        ${$x + ($dotSize - $ringSize) / 2}px,
        ${$y + ($dotSize - $ringSize) / 2}px
    ) scale(${$scale})`};
`;
