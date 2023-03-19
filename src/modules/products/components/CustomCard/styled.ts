import { Card } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
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
        content: "*";
      }
    }
  }
`;
