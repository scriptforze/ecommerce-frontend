import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = [
  "Products",
  "Product stocks by product",
  "Product specifications",
] as const;
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
      getAllProductStocksByProduct: build.query<
        GetAllProductStocksByProductApiResponse,
        GetAllProductStocksByProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/product_stocks`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
          },
        }),
        providesTags: ["Product stocks by product"],
      }),
      saveProductStockByProduct: build.mutation<
        SaveProductStockByProductApiResponse,
        SaveProductStockByProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/product_stocks`,
          method: "POST",
          body: queryArg.storeProductStockDto,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Product stocks by product"],
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
export type GetAllProductStocksByProductApiResponse =
  /** status 200 success */ {
    data?: ProductStock[];
    meta?: Pagination;
  };
export type GetAllProductStocksByProductApiArg = {
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
};
export type SaveProductStockByProductApiResponse = /** status 200 success */ {
  data?: ProductStock;
};
export type SaveProductStockByProductApiArg = {
  /** Id of product */
  product: number;
  /** Relationships of resource */
  include?: string;
  storeProductStockDto: StoreProductStockDto;
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
  productAttributeOptions?: ProductAttributeOption[];
  images?: Resource[];
};
export type Product = {
  id: number;
  type: string;
  name: string;
  slug: string;
  price: string;
  tax: string;
  short_description: string;
  description: string;
  is_variable: boolean;
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  status?: Status;
  category?: Category;
  images?: Resource[];
  productSpecifications?: ProductSpecification[];
  tags?: Tag[];
  productAttributeOptions?: ProductAttributeOption[];
  productStocks?: ProductStock[];
  specifications?: ProductSpecification[];
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
export type StoreProductStockDto = {
  price: number;
  product_attribute_options: number[];
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  images?: number[];
};
export type ModelNotFoundException = {
  error?: string;
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
  useGetAllProductStocksByProductQuery,
  useSaveProductStockByProductMutation,
  useGetProductSpecificationByIdQuery,
  useUpdateProductSpecificationMutation,
  useDeleteProductSpecificationMutation,
  useGetAllProductSpecificationQuery,
  useSaveProductSpecificationMutation,
} = injectedRtkApi;
