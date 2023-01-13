import styled from "styled-components";
import { Upload } from "antd";

export const StyledUpload = styled(Upload)`
  height: 100%;

  & > .ant-upload.ant-upload-select {
    width: 100% !important;
    height: 145px !important;
    margin-right: 0;
    margin-bottom: 0;
    overflow: hidden;
  }
`;
