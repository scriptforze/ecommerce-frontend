import { Space, Form, Steps } from "antd";
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
  opacity: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  animation: ${animateFadeOut} 200ms;
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
        color: #ff8855;
        :hover {
          background: #ff8855;
          border: 1px solid #ff8855;
          color: #ffffff;
        }
      }
      &--continue {
        background: #3e79f7;
        border: 1px solid #3e79f7;
        border-radius: 10px;
        color: #ffffff;
        :hover {
          background: #ffffff;
          border: 1px solid #3e79f7;
          color: #3e79f7;
        }
      }
      &--back {
        background: #ffffff;
        border: 1px solid #3e79f7;
        border-radius: 10px;
        color: #3e79f7;
        :hover {
          background: #3e79f7;
          border: 1px solid #3e79f7;
          border-radius: 10px;
          color: #ffffff;
        }
      }
      &--submit {
        background: #ff8855;
        border: 1px solid #ff8855;
        border-radius: 10px;
        color: #ffffff;
        :hover {
          background: #ffffff;
          border: 1px solid #ff8855;
          border-radius: 10px;
          color: #ff8855;
        }
      }
    }
  }
`;

export const FormGeneralStep = styled(Form)`
  margin-top: 20px;
`;

export const CustomStepProduct = styled(Steps)`
  .ant-steps-item-wait {
    .ant-steps-item-container {
      .ant-steps-item-icon {
        background: #ffffff;
        border: 1px solid #ff8855;
        span.ant-steps-icon {
          color: #ff8855;
        }
      }
    }
  }
  .ant-steps-item {
    .ant-steps-item-container {
      .ant-steps-item-content {
        margin-top: 5px;
        .ant-steps-item-title {
          font-size: 10pt;
        }
      }
    }
  }
  .ant-steps-item-process {
    .ant-steps-item-container {
      .ant-steps-item-content {
        .ant-steps-item-title {
          color: #00d1b0;
        }
      }
    }
  }
`;
