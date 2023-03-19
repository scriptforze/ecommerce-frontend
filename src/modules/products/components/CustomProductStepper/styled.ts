import { Steps } from "antd";
import styled from "styled-components";

export const CustomStepProduct = styled(Steps)`
  .ant-steps-item-wait.step {
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

  .ant-steps-item-wait.step,
  .ant-steps-item-finish.step,
  .ant-steps-item-process {
    .ant-steps-item-container {
      .ant-steps-item-icon {
        cursor: pointer;
      }
    }
  }

  .ant-steps-item-process {
    .ant-steps-item-container {
      .ant-steps-item-content {
        .ant-steps-item-title {
          color: ${({ theme }) => theme.token?.colorPrimary};
        }
      }
    }
  }
`;
