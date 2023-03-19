import { ReactNode } from "react";
import { ColumnType } from "antd/es/table";
import { ColumnGroupType } from "antd/lib/table";
import {
  ProductAttribute,
  ProductAttributeOption,
} from "@/services/productAttributeOptions";

export type CustomProductAttributeOption = Omit<
  ProductAttributeOption,
  "status" | "product_attribute"
>;

export interface ProductAttributeOptionsFormProps {
  productAttribute: ProductAttribute;
}

export interface ProductAttributeOptionsColumnsProps {
  handleDelete: (record: ProductAttributeOption) => void;
}

export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: ReactNode;
  editable: boolean;
  children: ReactNode;
  record: ProductAttributeOption;
  dataIndex: keyof CustomProductAttributeOption;
  handleSave: (record: ProductAttributeOption) => void;
}

export type ColumnTypes = (
  | ColumnGroupType<ProductAttributeOption>
  | ColumnType<ProductAttributeOption>
)[];
export type DataColumns = (ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[];
