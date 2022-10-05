import {
  // BookOutlined,
  // BorderlessTableOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";

export const menuTitles: MenuItemType[] = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "/products",
    label: "Products",
    icon: <ShoppingCartOutlined />,
  },
  // { key: 3, label: "Categories", icon: <BookOutlined /> },
  // { key: 4, label: "Tags", icon: <BorderlessTableOutlined /> },
];
