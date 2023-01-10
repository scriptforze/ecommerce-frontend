import { Card, Form } from "antd";
import styled, { keyframes, css } from "styled-components";

const animateFadeIn = keyframes`
  from {
    margin-top: 150px;
  }
  to{
    margin-top: 15px;
  }
`;

const animateFadeOut = keyframes`
  from {
    margin-top: 150px;
  } 
  to {
    margin-top: 15px;
  }

`;

export const FormGeneralStep = styled(Form)<{ $affixed: boolean }>`
  /* animation: ${animateFadeOut} 200ms; */
  margin-top: 15px;
  ${({ $affixed }) =>
    $affixed &&
    css`
      margin-top: 140px;
      /* animation: ${animateFadeIn}; */
      animation-duration: 200ms;
    `}
`;

export const CustomCard = styled(Card)`
  border-radius: 10px;
  .ant-card-head {
    border-bottom: none;
  }
  .ant-card-head div div {
    padding: 16px 0px;
  }

  .ant-card-body {
    padding-top: 0px;
  }
`;

// export const StyledSpace = styled(Space)<{ affixed: boolean }>`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   animation: ${animateFadeOut} 200ms;
//   opacity: 0;
//   ${({ affixed }) =>
//     affixed &&
//     css`
//       opacity: 1;
//       animation: ${animateFadeIn};
//       animation-duration: 200ms;
//     `}
// `;

// export const StyledSpaceButtons = styled(Space)`
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: end;
//   align-items: center;
//   .space-buttons {
//     &__button {
//       &--discard {
//         background: #ffffff;
//         border: 1px solid #ff8855;
//         border-radius: 10px;
//         padding: 12px, 16px, 12px, 16px;
//         color: #ff8855;
//       }
//       &--continue {
//         background: #ffffff;
//         border: 1px solid #3e79f7;
//         border-radius: 10px;
//         padding: 12px, 16px, 12px, 16px;
//         background: #3e79f7;
//         color: white;
//       }
//     }
//   }
// `;
