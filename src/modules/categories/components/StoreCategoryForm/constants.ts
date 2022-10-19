import { StoreCategoryRequest } from "@/services/categories";

export type CategoriesFieldsType = "name" | "image" | "parent_id";

export const STORE_CATEGORY_DEFAULT: StoreCategoryRequest = {
  name: "",
  image: new Blob([""]),
};
