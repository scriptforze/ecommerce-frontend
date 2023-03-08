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
import { useLangTranslation } from "../../hooks";

export const MenuTitles = (): ItemType[] => {
  const { translate } = useLangTranslation();
  return [
    {
      key: currentMenuKey(DashboardRoutesList.DASHBOARD),
      label: translate("menu.dashboard"),
      icon: <DashboardOutlined />,
    },
    {
      key: currentMenuKey("/products"),
      label: translate("menu.products"),
      icon: <ShoppingCartOutlined />,
    },
    {
      key: currentMenuKey(ProductAttributesRoutesList.PRODUCT_ATTRIBUTES),
      label: translate("menu.productAttributes"),
      icon: <ApartmentOutlined />,
    },
    {
      key: currentMenuKey(CategoriesRoutesList.CATEGORIES),
      label: translate("menu.categories"),
      icon: <BookOutlined />,
    },
    {
      key: currentMenuKey(TagsRoutesList.TAGS),
      label: translate("menu.tags"),
      icon: <BorderlessTableOutlined />,
    },
    {
      key: "zones",
      label: translate("menu.zones.title"),
      children: [
        {
          key: currentMenuKey(CountriesRoutesList.COUNTRIES),
          label: translate("menu.zones.countries"),
        },
        {
          key: currentMenuKey(StatesRoutesList.STATES),
          label: translate("menu.zones.states"),
        },
        {
          key: currentMenuKey(CitiesRoutesList.CITIES),
          label: translate("menu.zones.cities"),
        },
      ],
      icon: <GlobalOutlined />,
    },
  ];
};
