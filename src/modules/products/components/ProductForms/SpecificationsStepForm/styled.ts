import { Card } from "antd";
import styled, { css } from "styled-components";

export const TableContainer = styled(Card)<{ $affixed: boolean }>`
  margin-top: 15px;
  ${({ $affixed }) =>
    $affixed &&
    css`
      margin-top: 140px;
      animation-duration: 200ms;
    `}
`;
