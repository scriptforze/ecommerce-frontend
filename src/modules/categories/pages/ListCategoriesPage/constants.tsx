import { GetAllCategoriesApiArg } from "@/services/categories";

export const INITIAL_CATEGORIES_API_ARG: GetAllCategoriesApiArg = {
  include: "status",
  page: 1,
  perPage: 15,
};
