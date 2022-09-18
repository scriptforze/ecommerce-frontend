import { FC } from "react";
import { LayoutProps } from "antd";
import { StyledLayout } from "./styled";

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  return <StyledLayout {...props}>{children}</StyledLayout>;
};

export default Layout;
