import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Products"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      finishProduct: build.mutation<
        FinishProductApiResponse,
        FinishProductApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/finish`,
          method: "POST",
          body: queryArg.finishProductRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Products"],
      }),
      saveProductGeneral: build.mutation<
        SaveProductGeneralApiResponse,
        SaveProductGeneralApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/general`,
          method: "POST",
          body: queryArg.storeProductGeneralRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Products"],
      }),
      updateProductGeneral: build.mutation<
        UpdateProductGeneralApiResponse,
        UpdateProductGeneralApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/products/${queryArg.product}/general`,
          method: "PUT",
          body: queryArg.updateProductGeneralRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Products"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type FinishProductApiResponse = /** status 200 success */ {
  data?: Product;
};
export type FinishProductApiArg = {
  /** Id of product */
  product: number;
  /** Relationships of resource */
  include?: string;
  finishProductRequest: FinishProductRequest;
};
export type SaveProductGeneralApiResponse = /** status 200 success */ {
  data?: Product;
};
export type SaveProductGeneralApiArg = {
  /** Relationships of resource */
  include?: string;
  storeProductGeneralRequest: StoreProductGeneralRequest;
};
export type UpdateProductGeneralApiResponse = /** status 200 success */ {
  data?: Product;
};
export type UpdateProductGeneralApiArg = {
  /** Id of product */
  product: number;
  /** Relationships of resource */
  include?: string;
  updateProductGeneralRequest: UpdateProductGeneralRequest;
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
export type FinishProductRequest = {
  specifications: {
    name: string;
    value: string;
  }[];
};
export type StoreProductGeneralRequest = {
  type: "product" | "service";
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
    attach: {
      id: number;
      location: number;
    }[];
  };
  tags: {
    attach: number[];
  };
  product_attribute_options?: {
    attach: number[];
  };
};
export type UpdateProductGeneralRequest = {
  type?: "product" | "service";
  name?: string;
  category_id?: number;
  short_description?: string;
  description?: string;
  is_variable?: boolean;
  stock?: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  images?: {
    attach?: {
      id: number;
      location: number;
    }[];
    detach?: number[];
  };
  tags?: {
    attach?: number[];
    detach?: number[];
  };
  product_attribute_options?: {
    attach?: number[];
    detach?: number[];
  };
};
export const {
  useFinishProductMutation,
  useSaveProductGeneralMutation,
  useUpdateProductGeneralMutation,
} = injectedRtkApi;
