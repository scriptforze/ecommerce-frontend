import styled from "styled-components";
import { FormItem } from "@/modules/common/components";

export const FormItemHorizontal = styled(FormItem)`
  .ant-row.ant-form-item-row {
    flex-direction: row;
  }

  .ant-form-item-label {
    white-space: nowrap;
    text-align: end;
    padding: 0;
  }

  .ant-form-item-control {
    flex: 1 1 0;
    min-width: 0;
  }

  .ant-form-item-label > label {
    height: 32px;

    &::after {
      display: block;
      content: ":";
      position: relative;
      margin-block: 0;
      margin-inline-start: 2px;
      margin-inline-end: 8px;
    }
  }
`;
