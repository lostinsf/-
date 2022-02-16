import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      purple: string;
      black: string;
      white: string;
      gray200: string;
      blue: string;
    };
    fontSizes: {
      labelHamburger: number;
    };
  }
}
