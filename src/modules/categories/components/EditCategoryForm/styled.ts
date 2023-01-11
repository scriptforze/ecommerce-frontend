import styled from "styled-components";
import { Upload } from "antd";

export const StyledUpload = styled(Upload)`
  & > .ant-upload-select-picture-card {
    width: 100%;
    height: 146px;
    margin-right: 0;
    margin-bottom: 0;
    overflow: hidden;
  }
`;
