import { Layout } from "antd";
import styled from "styled-components";

export const StyledSideBar = styled(Layout.Sider)`
  width: 255px;
  padding-top: 64px;

  & > div.ant-layout-sider-children {
    & > ul.ant-menu {
      & > li.ant-menu-submenu.ant-menu-submenu-selected {
        & > div.ant-menu-submenu-title > span.ant-menu-title-content,
        span.anticon {
          color: #1c2e40;
          & ~ i.ant-menu-submenu-arrow::before,
          ~ i.ant-menu-submenu-arrow::after {
            background-color: #1c2e40;
          }
        }
      }

      & > li.ant-menu-submenu.ant-menu-submenu-open {
        & > div.ant-menu-submenu-title > span.ant-menu-title-content {
          font-weight: 800;
        }
        & > ul.ant-menu > li.ant-menu-item-selected {
          color: #1c2e40;
          font-weight: 800;
        }
      }
    }
  }
`;
