import { Theme } from '@emotion/react';

export const CONTAINER_PADDING_X = '12vw'; // vw
export const HEADER_HEIGHT = 60; // px
export const HEADER_LINE_Y = 20; // px;
export const ROUTER_SIZE = 80; // px
export const BOOTSTRAP_SM = 576; // px
export const FONTSIZE_MAIN = 18; // px

export const zIndexes = {
  base: 1,
  header: 100,
  routerFullscreen: 101,
  router: 102,
  customPointer: 501,
  loadingFullscreen: 900,
};

export const defaultTheme: Theme = {
  colors: {
    purple: '#783cf9',
    black: '#000',
    white: '#fff',
    gray200: '#d4d4d4',
    blue: '#112fd6',
  },
  fontSizes: {
    labelRouter: 36,
  },
};
