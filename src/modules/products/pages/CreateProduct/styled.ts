import { Space, Form } from "antd";
import styled, { keyframes, css } from "styled-components";

const animateFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const animateFadeOut = keyframes`
  from {
    opacity: 1;
  } 
  to {
    opacity: 0;
  }

`;

export const StyledSpace = styled(Space)<{ $affixed: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  animation: ${animateFadeOut} 200ms;
  opacity: 0;
  ${({ $affixed }) =>
    $affixed &&
    css`
      opacity: 1;
      animation: ${animateFadeIn};
      animation-duration: 200ms;
    `}
`;

export const StyledSpaceButtons = styled(Space)`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  .space-buttons {
    &__button {
      &--discard {
        background: #ffffff;
        border: 1px solid #ff8855;
        border-radius: 10px;
        padding: 12px, 16px, 12px, 16px;
        color: #ff8855;
      }
      &--continue {
        background: #ffffff;
        border: 1px solid #3e79f7;
        border-radius: 10px;
        padding: 12px, 16px, 12px, 16px;
        background: #3e79f7;
        color: white;
      }
    }
  }
`;

export const FormGeneralStep = styled(Form)`
  margin-top: 20px;
`;
