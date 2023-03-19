import { Card, Typography } from "antd";
import { StockVariationsTable } from "../StockVariationsTable";
import { StockVariationCardProps } from "./types";

export const StockVariationCard = ({
  attributeVariations,
}: StockVariationCardProps) => {
  const { attributeName, option, variations, attributesOptions } =
    attributeVariations;
  const { Title } = Typography;
  return (
    <Card>
      <Title level={3}>
        {attributeName} - {option.name}
      </Title>
      <StockVariationsTable
        variations={variations}
        attributesOptions={attributesOptions}
      />
    </Card>
  );
};
