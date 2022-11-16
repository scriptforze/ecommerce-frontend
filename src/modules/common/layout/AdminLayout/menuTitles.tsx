import {
  BookOutlined,
  // BorderlessTableOutlined,
  DashboardOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { CategoriesRoutesList } from "@/modules/categories";
import { DashboardRoutesList } from "@/modules/dashboard";
import { currentMenuKey } from "./utils";
import { CitiesRoutesList } from "@/modules/cities";
import { CountriesRoutesList } from "@/modules/countries";
import { StatesRoutesList } from "@/modules/states";

export const menuTitles: ItemType[] = [
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
  {
    key: "zones",
    label: "Zones",
    children: [
      {
        key: currentMenuKey(CountriesRoutesList.COUNTRIES),
        label: "Countries",
      },
      {
        key: currentMenuKey(StatesRoutesList.STATES),
        label: "States",
      },
      {
        key: currentMenuKey(CitiesRoutesList.CITIES),
        label: "Cities",
      },
    ],
    icon: <GlobalOutlined />,
  },
];
