import { CardProps } from "antd";
import { StyledCard } from "./styled";

export const CustomCard = (props: CardProps) => {
  return <StyledCard {...props} />;
};
