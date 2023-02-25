import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Product stocks by product"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      saveProductStockByProduct: build.mutation<
        SaveProductStockByProductApiResponse,
        SaveProductStockByProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/product_stocks`,
          method: "POST",
          body: queryArg.storeProductStockRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Product stocks by product"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type SaveProductStockByProductApiResponse = /** status 200 success */ {
  data?: ProductStock;
};
export type SaveProductStockByProductApiArg = {
  /** Id of product */
  product: number;
  /** Relationships of resource */
  include?: string;
  storeProductStockRequest: StoreProductStockRequest;
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
export type Product = {
  id: number;
  type: string;
  name: string;
  slug: string;
  sku: string;
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
export type StoreProductStockRequest = {
  price: number;
  product_attribute_options: number[];
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  images?: number[];
};
export const { useSaveProductStockByProductMutation } = injectedRtkApi;
