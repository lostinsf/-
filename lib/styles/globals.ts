import { css } from '@emotion/react';
import { defaultTheme } from './themes';

export const globalStyles = css`
  html {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
  }
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    background-color: ${defaultTheme.colors.black};
    color: ${defaultTheme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    box-sizing: border-box;
    cursor: none !important;
  }
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  button {
    border: none;
    outline: none;
  }
`;
