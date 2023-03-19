import { Table } from "antd";
import { AttributeVariation, VariationOption } from "../types";
import { StockVariationTableProps } from "./types";
import { getStockVariationsTableColumns } from "./utils";

export const StockVariationsTable = ({
  variations,
  attributesOptions,
}: StockVariationTableProps) => {
  const getRowKey = (record: AttributeVariation) => {
    return Object.values<VariationOption>(record.attributes)
      .map((option) => option.optionValue)
      .join("-");
  };
  const columns = getStockVariationsTableColumns(attributesOptions);

  return (
    <Table
      columns={columns}
      rowKey={getRowKey}
      dataSource={variations}
      scroll={{ x: 1500, y: 300 }}
    />
  );
};
