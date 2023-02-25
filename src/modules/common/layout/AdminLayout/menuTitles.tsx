import {
  ApartmentOutlined,
  BookOutlined,
  BorderlessTableOutlined,
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
import { TagsRoutesList } from "@/modules/tags";
import { ProductAttributesRoutesList } from "@/modules/product-attributes";

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
    key: currentMenuKey(ProductAttributesRoutesList.PRODUCT_ATTRIBUTES),
    label: "Product attributes",
    icon: <ApartmentOutlined />,
  },
  {
    key: currentMenuKey(CategoriesRoutesList.CATEGORIES),
    label: "Categories",
    icon: <BookOutlined />,
  },
  {
    key: currentMenuKey(TagsRoutesList.TAGS),
    label: "Tags",
    icon: <BorderlessTableOutlined />,
  },
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
