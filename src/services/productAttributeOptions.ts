import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = [
  "Product attribute options by product attribute",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllProductAttributeOptionsByProductAttribute: build.query<
        GetAllProductAttributeOptionsByProductAttributeApiResponse,
        GetAllProductAttributeOptionsByProductAttributeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_attributes/${queryArg.productAttribute}/product_attribute_options`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
          },
        }),
        providesTags: ["Product attribute options by product attribute"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetAllProductAttributeOptionsByProductAttributeApiResponse =
  /** status 200 success */ {
    data?: ProductAttributeOption[];
  };
export type GetAllProductAttributeOptionsByProductAttributeApiArg = {
  /** Id of product attribute */
  productAttribute: number;
  /** Relationships of resource */
  include?: string;
  /** String to search */
  search?: string;
  /** Number of resources per page */
  perPage?: number;
  /** Number of current page */
  page?: number;
  /** Name of field to sort */
  sortBy?: string;
};
export type Status = {
  id: number;
  name: string;
  type: string;
};
export type ProductAttribute = {
  id: number;
  name: string;
  type?: string;
  status?: Status;
};
export type ProductAttributeOption = {
  id: number;
  name: string;
  option: string;
  status?: Status;
  productAttribute?: ProductAttribute;
};
export type BadRequestException = {
  error?: string;
  code?: number;
};
export type AuthenticationException = {
  error?: string;
  code?: number;
};
export type AuthorizationException = {
  error?: string;
  code?: number;
};
export type ModelNotFoundException = {
  error?: string;
  code?: number;
};
export const { useGetAllProductAttributeOptionsByProductAttributeQuery } =
  injectedRtkApi;
