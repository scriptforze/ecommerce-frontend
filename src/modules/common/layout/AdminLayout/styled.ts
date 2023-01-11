import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const StyledLogo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`;

export const StyledMenuUnfoldOutlined = styled(MenuUnfoldOutlined)`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.token?.colorPrimary};
  }
`;

export const StyledMenuFoldOutlined = styled(MenuFoldOutlined)`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #00d1b0;
  }
`;
