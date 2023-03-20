import { Product, StoreProductGeneralRequest } from "@/services/products";

export interface AttributeProps {
  id: number;
  name: string;
  type: string;
}

export interface GeneralStepFormProps {
  product?: Product;
}

export interface ImageAttach {
  id: number;
  location: number;
}

export interface CustomProductFormValues
  extends Omit<
    StoreProductGeneralRequest,
    "product_attribute_options" | "tags" | "images"
  > {
  product_attribute_options: { attribute?: number; value?: number[] }[];
  array_images: { id: number; url: string }[];
  images: {
    attach: ImageAttach[];
    detach: number[];
  };
  tags: {
    attach: number[];
    detach: number[];
  };
  array_tags: number[];
}
