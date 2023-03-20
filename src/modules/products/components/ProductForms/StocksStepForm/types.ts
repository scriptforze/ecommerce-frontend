import { ProductAttributeOption } from "@/services/productAttributeOptions";
import { Product, StoreProductStockStepRequest } from "@/services/products";
import { CustomProductFormValues } from "../GeneralStepForm/types";

export interface StocksStepFormProps {
  product: Product;
}

export interface AttributeOption {
  optionId: number;
  optionValue: string;
  attributeName: string;
}

export interface AttributesOptions {
  attributeId: number;
  attributeName: string;
  options: AttributeOption[];
}

export interface AttributeVariation {
  attributes: Variation;
  sku: string;
  price: number;
  stock: number;
  width: number;
  height: number;
  length: number;
  weight: number;
}

export interface AttributeVariations {
  attributeId: number;
  attributeName: string;
  option: ProductAttributeOption;
  variations: AttributeVariation[];
  attributesOptions: AttributesOptions[];
}

export interface VariationOption {
  optionId: number;
  optionValue: string;
}

export interface Variation {
  [key: string]: VariationOption;
}

export interface CustomStocksStepFormValues
  extends CustomProductFormValues,
    StoreProductStockStepRequest {
  variationsGroupedByAttributeId: number | null;
}
