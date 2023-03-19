import { Badge, Space } from "antd";
import styled from "styled-components";

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
        border: 1px solid ${({ theme }) => theme.token?.colorPrimary};
        color: ${({ theme }) => theme.token?.colorPrimary};
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
