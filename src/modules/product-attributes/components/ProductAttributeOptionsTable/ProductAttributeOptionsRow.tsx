import { FormProvider, useForm } from "react-hook-form";
import { Form } from "antd";
import { ProductAttributeOption } from "@/services/productAttributeOptions";
import { EditableRowProps } from "./types";

export const ProductAttributeOptionsRow = ({
  index,
  ...props
}: EditableRowProps) => {
  const methods = useForm<ProductAttributeOption>({
    mode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <Form component={false}>
        <tr {...props} />
      </Form>
    </FormProvider>
  );
};
