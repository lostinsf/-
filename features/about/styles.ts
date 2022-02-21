import styled from '@emotion/styled';
import { HEADER_HEIGHT, CONTAINER_PADDING_X, FONTSIZE_MAIN, zIndexes, defaultTheme } from '@lib/styles';

type AboutProps = {
  isShow: boolean;
};
export const AboutWrapper = styled.div<AboutProps>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #6667ab;
  z-index: ${zIndexes.base};
  padding: ${HEADER_HEIGHT}px ${CONTAINER_PADDING_X} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AboutContents = styled.div`
  font-size: ${FONTSIZE_MAIN}px;
  color: ${defaultTheme.colors.white};
`;

export const LinkContents = styled.div`
  font-size: ${FONTSIZE_MAIN - 4}px;
  color: ${defaultTheme.colors.black};
`;
