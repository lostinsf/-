import { css } from '@emotion/react';

export const easeTransition = (isShow: boolean) => css`
  visibility: hidden;
  opacity: 0;
  transition: all 1.6s ease;

  ${isShow &&
  `
    visibility: visible;
    opacity: 1;
  `}
`;
