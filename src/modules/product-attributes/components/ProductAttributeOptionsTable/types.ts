import { ReactNode } from "react";
import { ColumnType } from "antd/es/table";
import { ColumnGroupType } from "antd/lib/table";
import {
  ProductAttribute,
  ProductAttributeOption,
} from "@/services/productAttributeOptions";

export type CustomProductAttributeOptionDto = Omit<
  ProductAttributeOption,
  "status" | "productAttribute"
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
  handleSave: (record: ProductAttributeOption) => void;
  dataIndex: keyof CustomProductAttributeOptionDto;
}

export type ColumnTypes = (
  | ColumnGroupType<ProductAttributeOption>
  | ColumnType<ProductAttributeOption>
)[];
export type DataColumns = (ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[];
