import { ColumnsType, ColumnType } from "antd/es/table";
import { AttributesOptions, AttributeVariation } from "../types";

export const getStockVariationsTableColumns = (
  attributesOptions: AttributesOptions[]
): ColumnsType<AttributeVariation> => {
  const DEFAULT_COLUMNS: ColumnsType<AttributeVariation> = [
    {
      key: "stock",
      title: "Stock",
      dataIndex: "stock",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "stock",
      title: "Stock",
      dataIndex: "stock",
    },
    {
      key: "width",
      title: "Width",
      dataIndex: "width",
    },
    {
      key: "height",
      title: "Height",
      dataIndex: "height",
    },
    {
      key: "length",
      title: "Length",
      dataIndex: "length",
    },
    {
      key: "weight",
      title: "Weight",
      dataIndex: "weight",
    },
  ];

  const columns = attributesOptions.map<ColumnType<AttributeVariation>>(
    (attr) => ({
      fixed: "left",
      title: attr.attributeName,
      render: (value: AttributeVariation) => {
        return value.attributes[attr.attributeName].optionValue;
      },
    })
  );
  return [...columns, ...DEFAULT_COLUMNS];
};
