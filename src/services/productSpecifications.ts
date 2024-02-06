import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Product specifications"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllProductSpecificationsByProduct: build.query<
        GetAllProductSpecificationsByProductApiResponse,
        GetAllProductSpecificationsByProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/specifications`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
            lang: queryArg.lang,
          },
        }),
        providesTags: ["Product specifications"],
      }),
      saveProductSpecificationByProduct: build.mutation<
        SaveProductSpecificationByProductApiResponse,
        SaveProductSpecificationByProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/specifications`,
          method: "POST",
          body: queryArg.storeProductProductSpecificationRequest,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
            lang: queryArg.lang,
          },
        }),
        invalidatesTags: ["Product specifications"],
      }),
      getProductSpecificationById: build.query<
        GetProductSpecificationByIdApiResponse,
        GetProductSpecificationByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/product_specifications/${queryArg.productSpecification}`,
          params: { lang: queryArg.lang },
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
          params: { lang: queryArg.lang },
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
          params: { lang: queryArg.lang },
        }),
        invalidatesTags: ["Product specifications"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetAllProductSpecificationsByProductApiResponse =
  /** status 200 success */ {
    data?: ProductSpecification[];
    meta?: Pagination;
  };
export type GetAllProductSpecificationsByProductApiArg = {
  /** Id of product */
  product: number;
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
export type SaveProductSpecificationByProductApiResponse =
  /** status 200 success */ {
    data?: ProductSpecification;
  };
export type SaveProductSpecificationByProductApiArg = {
  /** Id of product */
  product: number;
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
  storeProductProductSpecificationRequest: StoreProductProductSpecificationRequest;
};
export type GetProductSpecificationByIdApiResponse = /** status 200 success */ {
  data?: ProductSpecification;
};
export type GetProductSpecificationByIdApiArg = {
  /** Id of product specification */
  productSpecification: number;
  /** Code of language */
  lang?: string;
};
export type UpdateProductSpecificationApiResponse = /** status 200 success */ {
  data?: ProductSpecification;
};
export type UpdateProductSpecificationApiArg = {
  /** Id of product specification */
  productSpecification: number;
  /** Code of language */
  lang?: string;
  updateProductSpecificationRequest: UpdateProductSpecificationRequest;
};
export type DeleteProductSpecificationApiResponse = /** status 200 success */ {
  data?: ProductSpecification;
};
export type DeleteProductSpecificationApiArg = {
  /** Id of product specification */
  productSpecification: number;
  /** Code of language */
  lang?: string;
};
export type Status = {
  id: number;
  name: string;
  type: string;
};
export type ResourceUrls = {
  original: string;
  thumb?: string;
  small?: string;
  medium?: string;
};
export type Resource = {
  id: number;
  owner_id?: number;
  type_resource?: string;
  urls: ResourceUrls;
  options?: object;
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
  product_attribute_options?: ProductAttributeOption[];
};
export type ProductAttributeOption = {
  id: number;
  name: string;
  option?: string;
  status?: Status;
  product_attribute?: ProductAttribute;
};
export type ProductStock = {
  id: number;
  price: string;
  sku: string;
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  status?: Status;
  product?: Product;
  product_attribute_options?: ProductAttributeOption[];
  images?: Resource[];
};
export type Product = {
  id: number;
  type: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  tax: number;
  short_description: string;
  description: string;
  is_variable: boolean;
  amount_viewed: number;
  quantity_sold: number;
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  status?: Status;
  category?: Category;
  images?: Resource[];
  stock_images?: Resource[];
  tags?: Tag[];
  product_attribute_options?: ProductAttributeOption[];
  product_stocks?: ProductStock[];
  specifications?: ProductSpecification[];
};
export type ProductSpecification = {
  id: number;
  name: string;
  value: string;
  status?: Status;
  product?: Product;
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
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
export type ValidationException = {
  error?: object;
  code?: number;
};
export type StoreProductProductSpecificationRequest = {
  name: string;
  value: string;
};
export type ModelNotFoundException = {
  error?: string;
  code?: number;
};
export type UpdateProductSpecificationRequest = {
  name?: string;
  value?: string;
};
export const {
  useGetAllProductSpecificationsByProductQuery,
  useSaveProductSpecificationByProductMutation,
  useGetProductSpecificationByIdQuery,
  useUpdateProductSpecificationMutation,
  useDeleteProductSpecificationMutation,
} = injectedRtkApi;
