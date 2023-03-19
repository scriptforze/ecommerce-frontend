import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Product stocks"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllProductStocksByProduct: build.query<
        GetAllProductStocksByProductApiResponse,
        GetAllProductStocksByProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/stocks`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
            lang: queryArg.lang,
          },
        }),
        providesTags: ["Product stocks"],
      }),
      saveProductStockByProduct: build.mutation<
        SaveProductStockByProductApiResponse,
        SaveProductStockByProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/stocks`,
          method: "POST",
          body: queryArg.storeProductProductStockRequest,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Product stocks"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
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
  /** Code of language */
  lang?: string;
};
export type SaveProductStockByProductApiResponse = /** status 200 success */ {
  data?: ProductStock[];
};
export type SaveProductStockByProductApiArg = {
  /** Id of product */
  product: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
  storeProductProductStockRequest: StoreProductProductStockRequest;
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
export type ProductSpecification = {
  id: number;
  name: string;
  value: string;
  status?: Status;
  product?: Product;
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
export type StoreProductProductStockRequest = {
  product_attribute_options: number[];
  price: number;
  sku?: string;
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  images?: {
    attach?: number[];
  };
};
export const {
  useGetAllProductStocksByProductQuery,
  useSaveProductStockByProductMutation,
} = injectedRtkApi;
