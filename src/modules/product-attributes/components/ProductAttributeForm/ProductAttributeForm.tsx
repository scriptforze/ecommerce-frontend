import { Controller, useForm } from "react-hook-form";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SaveProductAttributeApiResponse,
  StoreProductAttributeRequest,
  useSaveProductAttributeMutation,
  useUpdateProductAttributeMutation,
} from "@/services/productAttributes";
import { ProductAttributeFormProps } from "./types";
import { ProductAttributeOptionsTable } from "../ProductAttributeOptionsTable";
import { FormItem } from "@/modules/common/components";
import { pushNotification } from "@/modules/common/helpers";
import { ProductAttributesRoutesList } from "@/modules/product-attributes/routes";

export const ProductAttributeForm = ({
  productAttribute,
}: ProductAttributeFormProps) => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<StoreProductAttributeRequest>({
    mode: "onChange",
    defaultValues: {
      type: "selector",
      name: productAttribute?.name || "",
    },
  });

  const [storeAttribute, { isLoading: isStoreAttrLoading }] =
    useSaveProductAttributeMutation();

  const [updateAttribute, { isLoading: isUpdateAttrLoading }] =
    useUpdateProductAttributeMutation();

  const onStoreSuccess = ({
    data: productCreated,
  }: SaveProductAttributeApiResponse) => {
    pushNotification({
      type: "success",
      title: `Attribute Created`,
      message: `Attribute created successfull`,
    });

    navigate(
      `${ProductAttributesRoutesList.PRODUCT_ATTRIBUTES}/${
        ProductAttributesRoutesList.EDIT_PRODUCT_ATTRIBUTE
      }/${productCreated!.id}`
    );
  };

  const onUpdateSuccess = () => {
    pushNotification({
      type: "success",
      title: `Attribute Updated`,
      message: `Attribute updated successfull`,
    });
  };

  const onSubmit = (data: StoreProductAttributeRequest) => {
    if (!productAttribute) {
      storeAttribute({ storeProductAttributeRequest: data })
        .unwrap()
        .then(onStoreSuccess);
    } else {
      updateAttribute({
        updateProductAttributeRequest: data,
        productAttribute: productAttribute.id,
      })
        .unwrap()
        .then(onUpdateSuccess);
    }
  };

  return (
    <Card>
      <Form
        layout="vertical"
        autoComplete="off"
        style={{ marginBottom: 50 }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Attribute name is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Name:" required>
              <Input
                status={error && "error"}
                placeholder="Name of the attribute"
                {...field}
              />
            </FormItem>
          )}
        />
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: "right" }}
            loading={isStoreAttrLoading || isUpdateAttrLoading}
          >
            {!productAttribute ? "Save" : "Update"}
          </Button>
        </FormItem>
      </Form>
      {productAttribute ? (
        <ProductAttributeOptionsTable productAttribute={productAttribute} />
      ) : null}
    </Card>
  );
};
