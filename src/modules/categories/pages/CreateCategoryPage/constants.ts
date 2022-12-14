import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { CategoriesRoutesList } from "@/modules/categories/routes";

export const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
  {
    title: "Categories",
    link: CategoriesRoutesList.CATEGORIES,
  },
  {
    title: "New category",
  },
];
