import { Form } from "antd";
import styled, { css } from "styled-components";

export const StyledFormGeneral = styled(Form)<{ $affixed: boolean }>`
  margin-top: 15px;
  ${({ $affixed }) =>
    $affixed &&
    css`
      margin-top: 140px;
      animation-duration: 200ms;
    `}
`;
