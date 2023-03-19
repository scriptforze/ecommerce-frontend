import { FormProps } from "antd";

export interface CustomFormContainerProps extends FormProps {
  $affixed: boolean;
  children: React.ReactNode;
}
