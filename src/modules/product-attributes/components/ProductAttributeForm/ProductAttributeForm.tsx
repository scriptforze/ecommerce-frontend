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
import { useLangTranslation } from "@/modules/common/hooks";
import { ProductAttributesRoutesList } from "@/modules/product-attributes/routes";

export const ProductAttributeForm = ({
  productAttribute,
}: ProductAttributeFormProps) => {
  const navigate = useNavigate();
  const { translate } = useLangTranslation();

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
      title: translate(
        "products.form.messages.success.createAttribute.titleAttribute"
      ),
      message: translate(
        "products.form.messages.success.createAttribute.msgAttribute"
      ),
    });

    navigate(
      `${ProductAttributesRoutesList.PRODUCT_ATTRIBUTES}/${ProductAttributesRoutesList.EDIT_PRODUCT_ATTRIBUTE
      }/${productCreated!.id}`
    );
  };

  const onUpdateSuccess = () => {
    pushNotification({
      type: "success",
      title: translate(
        "products.form.messages.success.updateAttribute.msgAttribute"
      ),
      message: translate(
        "products.form.messages.success.updateAttribute.msgAttribute"
      ),
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
              message: translate(
                "products.list.messages.success.validation.requireAttribute"
              ),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormItem label={`${translate("common.columns.name")}:`} required>
              <Input
                status={error && "error"}
                placeholder={translate(
                  "products.list.placeholder.enterNameAttribute"
                )}
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
            {!productAttribute
              ? translate("common.submit.create")
              : translate("common.submit.update")}
          </Button>
        </FormItem>
      </Form>
      {productAttribute ? (
        <ProductAttributeOptionsTable productAttribute={productAttribute} />
      ) : null}
    </Card>
  );
};
