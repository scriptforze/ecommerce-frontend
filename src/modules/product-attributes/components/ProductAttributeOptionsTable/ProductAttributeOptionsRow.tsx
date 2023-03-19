import { FormProvider, useForm } from "react-hook-form";
import { Form } from "antd";
import { CustomProductAttributeOption, EditableRowProps } from "./types";

export const ProductAttributeOptionsRow = ({
  index,
  ...props
}: EditableRowProps) => {
  const methods = useForm<CustomProductAttributeOption>({
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
