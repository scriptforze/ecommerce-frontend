import { AttributesOptions, AttributeVariation } from "../types";

export interface StockVariationTableProps {
  variations: AttributeVariation[];
  attributesOptions: AttributesOptions[];
}

export interface StockVariationTableColumns extends AttributesOptions {
  price: number;
  sku: string;
  stock: number;
  width: number;
  height: number;
  length: number;
  weight: number;
}
