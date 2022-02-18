import styled from '@emotion/styled';
import {
  defaultTheme,
  zIndexes,
  CONTAINER_PADDING_X,
  ROUTER_SIZE,
  HEADER_HEIGHT,
  HEADER_LINE_Y,
  BOOTSTRAP_SM,
} from '@lib/styles';

export const HeaderBarWrapper = styled.header`
  position: fixed;
  z-index: ${zIndexes.header};
  width: 100%;
  padding: 0 ${CONTAINER_PADDING_X};
  height: ${HEADER_HEIGHT}px;
  background-color: #fff;
`;

export const HeaderBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-right: ${ROUTER_SIZE}px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  color: ${defaultTheme.colors.blue};
  @media (max-width: ${BOOTSTRAP_SM}px) {
    display: none;
  }
`;

export const HeaderBarSimbol = styled.div`
  position: relative;
  background: url(https://smartgeo.blob.core.windows.net/landing/il_headerSimbol.svg) center center/contain no-repeat;
  min-width: 20px;
  min-height: 22px;
  max-width: 30px;
  max-height: 33px;
  width: 100%;
  height: 100%;
  margin-top: ${HEADER_LINE_Y}px;
`;

export const HeaderBarLogo = styled.div`
  position: relative;
  background: url(https://smartgeo.blob.core.windows.net/landing/il_headerLogo.svg) center center/contain no-repeat;
  min-width: 71px;
  min-height: 10px;
  max-width: 142px;
  max-height: 20px;
  width: 100%;
  height: 100%;
  margin-right: 30%;
  margin-top: ${HEADER_LINE_Y}px;
`;
