import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { ProductsRoutesList } from "@/modules/products/routes";

export const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
  {
    title: "Products",
    link: ProductsRoutesList.PRODUCTS,
  },
  {
    title: "New product",
  },
];

export const STEPS_ITEMS = [
  {
    title: "General",
  },
  {
    title: "Stocks",
  },
  {
    title: "Specifications",
  },
];
