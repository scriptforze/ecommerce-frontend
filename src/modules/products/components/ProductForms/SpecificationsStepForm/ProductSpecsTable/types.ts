import { ReactNode } from "react";
import { ColumnType } from "antd/es/table";
import { ColumnGroupType } from "antd/lib/table";
import {
  ProductSpecification,
  StoreProductProductSpecificationRequest,
} from "@/services/productSpecifications";
import { Product } from "@/services/products";

export interface ProductSpecificationsTableProps {
  product: Product;
  isFetching: boolean;
  specifications?: ProductSpecification[];
}

export interface ProductSpecificationsFormProps {
  productSpecifications: ProductSpecification[];
}

export interface ProductSpecificationsColumnsProps {
  handleDelete: (record: ProductSpecification) => void;
}

export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: ReactNode;
  editable: boolean;
  children: ReactNode;
  record: ProductSpecification;
  handleSave: (record: ProductSpecification) => void;
  dataIndex: keyof StoreProductProductSpecificationRequest;
}

export type ColumnTypes = (
  | ColumnGroupType<ProductSpecification>
  | ColumnType<ProductSpecification>
)[];
export type DataColumns = (ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[];
