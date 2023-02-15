import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Products"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      saveProduct: build.mutation<SaveProductApiResponse, SaveProductApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/products`,
          method: "POST",
          body: queryArg.storeProductDto,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Products"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type SaveProductApiResponse = /** status 200 success */ {
  data?: Product;
};
export type SaveProductApiArg = {
  /** Relationships of resource */
  include?: string;
  storeProductDto: StoreProductDto;
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
export type StoreProductDto = {
  name: string;
  category_id: number;
  price: number;
  tax: number;
  short_description?: string;
  description: string;
  is_variable: boolean;
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  images: {
    id: number;
    location: number;
  }[];
  tags: number[];
  product_attribute_options?: number[];
};
export const { useSaveProductMutation } = injectedRtkApi;
