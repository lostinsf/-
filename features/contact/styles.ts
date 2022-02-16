import styled from '@emotion/styled';

export const ContactWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.purple};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;

  .rc-progress-line {
    border-radius: 0;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
`;

export const BottomContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.gray200};
`;
