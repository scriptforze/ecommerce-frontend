import { Form } from "antd";
import styled from "styled-components";

export const StyledItem = styled(Form.Item)`
  margin-bottom: 10px;
  /* .ant-form-item-row .ant-form-item-label::before {
    color: red;
    content: "* ";
  } */

  h5.ant-typography {
    margin-top: 16px;
  }

  span.ant-typography {
    font-size: 9pt;
    display: inline-block;
    margin-bottom: 3px;
  }
`;
