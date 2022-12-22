import { Affix } from "antd";
import styled, { css, keyframes } from "styled-components";
import { CustomAffixContainerProps } from "./types";

const animateHorizontalEaseIn = keyframes`
  0% {
    margin-left: 24px;
    width: calc(100% - 48px);
  }
  100%{
    width: 100%;
    margin-left: 0px;
  }
`;

const animateHorizontalEaseOut = keyframes`
  from {
    margin-left: -24px;
    width: calc(100% + 48px);
  } 
  to {
    width: 100%;
  }

`;

export const StyledAffixContainer = styled(Affix)<CustomAffixContainerProps>`
  animation: ${animateHorizontalEaseOut} 200ms ease-out;
  ${({ $affixed }) =>
    $affixed &&
    css`
      left: 0;
      width: 100%;
      position: absolute;
      animation: ${animateHorizontalEaseIn};
      animation-duration: 200ms;
      animation-timing-function: ease-in;
      .ant-affix {
        .ant-card,
        .ant-card-body {
          border-left: none;
          border-radius: 0px;
        }
      }
    `}
`;
