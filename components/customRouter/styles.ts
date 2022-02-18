import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { defaultTheme, zIndexes, CONTAINER_PADDING_X, ROUTER_SIZE, HEADER_HEIGHT, HEADER_LINE_Y } from '@lib/styles';

type CurstomRouterWrapperProps = {
  isOpen: boolean;
};
export const CurstomRouterWrapper = styled.button<CurstomRouterWrapperProps>`
  background-color: transparent;
  height: ${HEADER_HEIGHT}px;
  padding: 0;
  right: ${CONTAINER_PADDING_X};
  position: fixed;
  width: ${ROUTER_SIZE}px;
  z-index: ${zIndexes.router};
  display: inline-flex;
  align-items: center;
  span {
    background-color: ${defaultTheme.colors.blue};
    content: '';
    height: 2px;
    position: relative;
    transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out, transform 0.2s linear;
    width: ${ROUTER_SIZE * 0.3}px;
    margin-top: ${HEADER_LINE_Y}px;
    &:before {
      background-color: ${defaultTheme.colors.blue};
      content: '';
      display: block;
      height: 2px;
      position: absolute;
      transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out, transform 0.2s linear;
      width: ${ROUTER_SIZE * 0.3}px;
      top: -8px;
    }
    &:after {
      background-color: ${defaultTheme.colors.blue};
      content: '';
      display: block;
      height: 2px;
      position: absolute;
      transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out, transform 0.2s linear;
      width: ${ROUTER_SIZE * 0.3}px;
      top: 8px;
    }
  }
  p {
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    text-transform: uppercase;
    color: ${defaultTheme.colors.blue};
    position: relative;
    width: ${ROUTER_SIZE * 0.7}px;
    margin-top: ${HEADER_LINE_Y}px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      span {
        background-color: transparent;
        transition: 0.2s ease-out;

        &:before,
        &:after {
          transition: top 0.2s ease-out, transform 0.2s 0.2s ease-out, background-color 0.2s 0.4s;
          background-color: ${defaultTheme.colors.white};
        }

        &:before {
          top: 0;
          transform: rotate3d(0, 0, 1, -45deg);
        }

        &:after {
          top: 0;
          transform: rotate3d(0, 0, 1, 45deg);
        }
      }
    `}
`;
