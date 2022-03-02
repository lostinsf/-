import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HEADER_HEIGHT, CONTAINER_PADDING_X, FONTSIZE_MAIN, zIndexes, defaultTheme } from '@lib/styles';

type ServicesProps = {
  isShow: boolean;
};
export const ServicesWrapper = styled.div<ServicesProps>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #efbd57;
  z-index: ${zIndexes.base};
  padding: ${HEADER_HEIGHT}px ${CONTAINER_PADDING_X} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const ServicesContents = styled.div`
  font-size: ${FONTSIZE_MAIN}px;
  color: ${defaultTheme.colors.white};
`;

export const LinkContents = styled.div`
  font-size: ${FONTSIZE_MAIN - 4}px;
  color: ${defaultTheme.colors.black};
`;

type ChatBalloonContentsProps = {
  isLeft?: boolean;
};
export const ChatBalloonContents = styled.div<ChatBalloonContentsProps>`
  position: relative;
  background: #88b7d5;
  border-radius: 50px;
  padding: 0 20px;
  margin-bottom: 10px;
  width: fit-content;
  right: 0;
  float: right;
  clear: both;
  height: 40px;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    position: absolute;
    left: calc(100% - 4px);
    top: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    pointer-events: none;
    border-left-color: #88b7d5;
    border-width: 10px;
    margin-top: -10px;
  }

  ${(props) =>
    props.isLeft &&
    css`
    background: #1c8a18;
    float: left;
    &:after {
      left: unset;
      border-left-color: transparent;
      right:calc(100% - 4px);
      border-right-color: #1c8a18;
  `}
`;
