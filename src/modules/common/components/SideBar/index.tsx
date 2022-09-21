import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps, Menu, Layout } from "antd";
import React, { FC } from "react";
import { StyledSideBar } from "./styled";
import { SideBarProps } from "./types";

const { Content } = Layout;

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const SideBarContent: FC<SideBarProps> = ({ children }) => {
  return (
    <Layout>
      <StyledSideBar>
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          items={items2}
        />
      </StyledSideBar>
      <Content>{children}</Content>
    </Layout>
  );
};

export default SideBarContent;
