import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { TagsRoutesList } from "@/modules/tags/routes/constants";

export const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
  {
    title: "Tags",
    link: TagsRoutesList.TAGS,
  },
  {
    title: "New tag",
  },
];
