import { StyledFormGeneral } from "./styled";
import { CustomFormContainerProps } from "./types";

export const CustomForm = ({
  children,
  ...props
}: CustomFormContainerProps) => {
  return <StyledFormGeneral {...props}>{children}</StyledFormGeneral>;
};
