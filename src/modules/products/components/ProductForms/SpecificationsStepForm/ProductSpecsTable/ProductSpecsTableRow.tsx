import { FormProvider, useForm } from "react-hook-form";
import { Form } from "antd";
import { EditableRowProps } from "./types";
import { StoreProductProductSpecificationRequest } from "@/services/productSpecifications";

export const ProductSpecsTableRow = ({ index, ...props }: EditableRowProps) => {
  const methods = useForm<StoreProductProductSpecificationRequest>({
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
