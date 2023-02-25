import { StoreProductGeneralRequest } from "@/services/products";

export interface AttributeProps {
  id: number;
  name: string;
  type: string;
}

export type ActionToPerform = "create" | "update";

export interface CustomStoreProductDto
  extends Omit<
    StoreProductGeneralRequest,
    "product_attribute_options" | "images"
  > {
  product_attribute_options?: { attribute?: number; value?: number[] }[];
  images: { id: number; url: string }[];
}
