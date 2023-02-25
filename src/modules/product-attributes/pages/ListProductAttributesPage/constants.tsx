import { GetAllProductAttributesApiArg } from "@/services/productAttributes";

export const INITIAL_PRODUCT_ATTRIBUTES_API_ARG: GetAllProductAttributesApiArg =
  {
    include: "status",
    page: 1,
    perPage: 15,
  };
