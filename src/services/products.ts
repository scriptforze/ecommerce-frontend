import { ecommerceApi as api } from "../store/ecommerceApi";

export const addTagTypes = ["Products", "Product specifications"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllProducts: build.query<
        GetAllProductsApiResponse,
        GetAllProductsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
          },
        }),
        providesTags: ["Products"],
      }),
      getProductSpecificationById: build.query<
        GetProductSpecificationByIdApiResponse,
        GetProductSpecificationByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_specifications/${queryArg.productSpecification}`,
        }),
        providesTags: ["Product specifications"],
      }),
      updateProductSpecification: build.mutation<
        UpdateProductSpecificationApiResponse,
        UpdateProductSpecificationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_specifications/${queryArg.productSpecification}`,
          method: "PUT",
          body: queryArg.updateProductSpecificationRequest,
        }),
        invalidatesTags: ["Product specifications"],
      }),
      deleteProductSpecification: build.mutation<
        DeleteProductSpecificationApiResponse,
        DeleteProductSpecificationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_specifications/${queryArg.productSpecification}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Product specifications"],
      }),
      getAllProductSpecification: build.query<
        GetAllProductSpecificationApiResponse,
        GetAllProductSpecificationApiArg
      >({
        query: () => ({ url: `/api/v1/product_specifications` }),
        providesTags: ["Product specifications"],
      }),
      saveProductSpecification: build.mutation<
        SaveProductSpecificationApiResponse,
        SaveProductSpecificationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_specifications`,
          method: "POST",
          body: queryArg.storeProductSpecificationRequest,
        }),
        invalidatesTags: ["Product specifications"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetAllProductsApiResponse = /** status 200 success */ {
  data?: Product[];
  meta?: Pagination;
};
export type GetAllProductsApiArg = {
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
export type GetProductSpecificationByIdApiResponse = /** status 200 success */ {
  data?: ProductSpecification;
};
export type GetProductSpecificationByIdApiArg = {
  /** Id of product specification */
  productSpecification: number;
};
export type UpdateProductSpecificationApiResponse = /** status 200 success */ {
  data?: ProductSpecification;
};
export type UpdateProductSpecificationApiArg = {
  /** Id of product specification */
  productSpecification: number;
  updateProductSpecificationRequest: UpdateProductSpecificationRequest;
};
export type DeleteProductSpecificationApiResponse = /** status 200 success */ {
  data?: ProductSpecification;
};
export type DeleteProductSpecificationApiArg = {
  /** Id of product specification */
  productSpecification: number;
};
export type GetAllProductSpecificationApiResponse = /** status 200 success */ {
  data?: ProductSpecification[];
};
export type GetAllProductSpecificationApiArg = void;
export type SaveProductSpecificationApiResponse = /** status 200 success */ {
  data?: ProductSpecification;
};
export type SaveProductSpecificationApiArg = {
  storeProductSpecificationRequest: StoreProductSpecificationRequest;
};
export type Status = {
  id: number;
  name: string;
  type: string;
};
export type Resource = {
  id: number;
  url: string;
  type_resource: string;
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  parent_id?: number;
  status?: Status;
  image?: Resource;
  children?: Category[];
};
export type ProductSpecification = {
  id: number;
  name: string;
  value: string;
  status?: Status;
  product?: Product;
};
export type Tag = {
  id: number;
  name: string;
  slug: string;
  status?: Status;
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
export type Product = {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  status?: Status;
  category?: Category;
  photos?: Resource[];
  productSpecifications?: ProductSpecification[];
  tags?: Tag[];
  productAttributeOptions?: ProductAttributeOption[];
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
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
export type UpdateProductSpecificationRequest = {
  name?: string | null;
  product_id?: number | null;
  value?: string | null;
};
export type StoreProductSpecificationRequest = {
  name: string;
  product_id: number;
  value: string;
};
export const {
  useGetAllProductsQuery,
  useGetProductSpecificationByIdQuery,
  useUpdateProductSpecificationMutation,
  useDeleteProductSpecificationMutation,
  useGetAllProductSpecificationQuery,
  useSaveProductSpecificationMutation,
} = injectedRtkApi;
