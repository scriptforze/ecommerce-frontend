import { FormItemProps } from "antd";
import { StyledItem } from "./styled";

export const FormItem = (itemsProps: FormItemProps) => {
  return <StyledItem {...itemsProps} />;
};
