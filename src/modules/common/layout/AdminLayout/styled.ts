import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const StyledLogo = styled.div`
  margin: 20px;
  width: 160px;
  height: 40px;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.3);

  &.logo-container {
    &--collapsed {
      width: 40px;
      height: 40px;
    }
  }

  & img {
    &.sidebar-logo {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      transition: opacity 0.3s ease-in-out;

      &--hide {
        opacity: 0;
      }
    }
  }
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
    color: ${({ theme }) => theme.token?.colorPrimary};
  }
`;
