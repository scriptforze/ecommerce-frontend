import { Card, Form, Badge, Space } from "antd";
import styled, { css } from "styled-components";

export const FormGeneralStep = styled(Form)<{ $affixed: boolean }>`
  margin-top: 15px;
  ${({ $affixed }) =>
    $affixed &&
    css`
      margin-top: 140px;
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

  .custom-card {
    &__footer {
      &--text {
        justify-content: center;
        width: 100%;
        align-items: center;
      }
      &--text p::before {
        color: #00d1b0;
        content: "*";
      }
    }
  }
`;

export const CustomBadge = styled(Badge)`
  .button-badge {
    &__button {
      &--remove {
        background-color: red;
        border: 1px solid red;
        border-radius: 15px;
        padding: 2px 5px;
        color: #ffffff;
        font-size: 8pt;
        margin-right: 8px;
        height: auto;
      }
      &--remove:hover {
        border: 1px solid red;
        color: #ffffff;
      }
      &--checked {
        background-color: white;
        border: 1px solid #00d1b0;
        color: #00d1b0;
        font-size: 8pt;
        margin-right: 8px;
        padding: 5px 5px;
        height: auto;
        border-radius: 15px;
        border-spacing: 1px;
        width: auto !important;
      }
    }
  }
`;

export const CustomSpace = styled(Space)`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 65px;
`;
