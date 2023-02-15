import { StoreProductDto } from "@/services/products";

export interface AttributeProps {
  id: number;
  name: string;
  type: string;
}

export interface CustomStoreProductDto
  extends Omit<StoreProductDto, "product_attribute_options" | "images"> {
  product_attribute_options: { attribute?: number; value?: number[] }[];
  images: { resourceId: number; location: number; url: string }[];
}
