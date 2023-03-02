import { GetAllProductAttributesApiArg } from "@/services/productAttributes";

export const INITIAL_PRODUCTS_API_ARG: GetAllProductAttributesApiArg = {
  page: 1,
  perPage: 15,
  include: "status,product_stocks,category",
};
