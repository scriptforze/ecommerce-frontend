import {
  BookOutlined,
  // BorderlessTableOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import { CategoriesRoutesList } from "@/modules/categories";
import { DashboardRoutesList } from "@/modules/dashboard";
import { currentMenuKey } from "./utils";

export const menuTitles: MenuItemType[] = [
  {
    key: currentMenuKey(DashboardRoutesList.DASHBOARD),
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: currentMenuKey("/products"),
    label: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    key: currentMenuKey(CategoriesRoutesList.CATEGORIES),
    label: "Categories",
    icon: <BookOutlined />,
  },
  // { key: 4, label: "Tags", icon: <BorderlessTableOutlined /> },
];
