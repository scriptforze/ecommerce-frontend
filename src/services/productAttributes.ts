import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Product attributes"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProductAttributeById: build.query<
        GetProductAttributeByIdApiResponse,
        GetProductAttributeByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_attributes/${queryArg.productAttribute}`,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        providesTags: ["Product attributes"],
      }),
      updateProductAttribute: build.mutation<
        UpdateProductAttributeApiResponse,
        UpdateProductAttributeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_attributes/${queryArg.productAttribute}`,
          method: "PUT",
          body: queryArg.updateProductAttributeRequest,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Product attributes"],
      }),
      deleteProductAttribute: build.mutation<
        DeleteProductAttributeApiResponse,
        DeleteProductAttributeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_attributes/${queryArg.productAttribute}`,
          method: "DELETE",
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Product attributes"],
      }),
      getAllProductAttributes: build.query<
        GetAllProductAttributesApiResponse,
        GetAllProductAttributesApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_attributes`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
            lang: queryArg.lang,
          },
        }),
        providesTags: ["Product attributes"],
      }),
      saveProductAttribute: build.mutation<
        SaveProductAttributeApiResponse,
        SaveProductAttributeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_attributes`,
          method: "POST",
          body: queryArg.storeProductAttributeRequest,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Product attributes"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetProductAttributeByIdApiResponse = /** status 200 success */ {
  data?: ProductAttribute;
};
export type GetProductAttributeByIdApiArg = {
  /** Id of product attribute */
  productAttribute: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
};
export type UpdateProductAttributeApiResponse = /** status 200 success */ {
  data?: ProductAttribute;
};
export type UpdateProductAttributeApiArg = {
  /** Id of product attribute */
  productAttribute: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
  updateProductAttributeRequest: UpdateProductAttributeRequest;
};
export type DeleteProductAttributeApiResponse = /** status 200 success */ {
  data?: ProductAttribute;
};
export type DeleteProductAttributeApiArg = {
  /** Id of product attribute */
  productAttribute: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
};
export type GetAllProductAttributesApiResponse = /** status 200 success */ {
  data?: ProductAttribute[];
  meta?: Pagination;
};
export type GetAllProductAttributesApiArg = {
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
  /** Code of language */
  lang?: string;
};
export type SaveProductAttributeApiResponse = /** status 200 success */ {
  data?: ProductAttribute;
};
export type SaveProductAttributeApiArg = {
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
  storeProductAttributeRequest: StoreProductAttributeRequest;
};
export type Status = {
  id: number;
  name: string;
  type: string;
};
export type ProductAttributeOption = {
  id: number;
  name: string;
  option?: string;
  status?: Status;
  product_attribute?: ProductAttribute;
};
export type ProductAttribute = {
  id: number;
  name: string;
  type?: string;
  status?: Status;
  product_attribute_options?: ProductAttributeOption[];
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
export type BadRequestException = {
  error?: string;
  code?: number;
};
export type ValidationException = {
  error?: object;
  code?: number;
};
export type UpdateProductAttributeRequest = {
  name?: string;
  type?: "selector" | "button" | "color";
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export type StoreProductAttributeRequest = {
  name: string;
  type: "selector" | "button" | "color";
};
export const {
  useGetProductAttributeByIdQuery,
  useUpdateProductAttributeMutation,
  useDeleteProductAttributeMutation,
  useGetAllProductAttributesQuery,
  useSaveProductAttributeMutation,
} = injectedRtkApi;
