import { Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { characterCount } from "@/modules/products/components/ProductForms/GeneralStepForm/utils";
import { CustomProductFormValues } from "../../types";
import { CustomCard } from "@/modules/products/components/CustomCard";
import { useLangTranslation } from "@/modules/common/hooks";

export const BasicInfoGroup = () => {
  const { Text } = Typography;
  const { control } = useFormContext<CustomProductFormValues>();
  const { translate } = useLangTranslation();

  return (
    <CustomCard title={translate("products.list.create")}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            value: true,
            message: `${translate(
              "products.list.messages.success.validation.requireProduct"
            )}`,
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormItem
            label={`${translate(
              "products.list.messages.success.subtitle.product"
            )}:`}
            required
          >
            <Input
              {...field}
              size="large"
              status={error && "error"}
              placeholder={`${translate(
                "products.list.messages.success.subtitle.product"
              )}`}
            />
            <Text type="danger">{error?.message} &nbsp;</Text>
          </FormItem>
        )}
      />

      <Controller
        control={control}
        name="short_description"
        render={({ field }) => (
          <FormItem
            label={`${translate(
              "products.list.messages.success.subtitle.short"
            )}:`}
          >
            <Input.TextArea
              rows={4}
              size="large"
              maxLength={250}
              showCount={characterCount}
              placeholder={`${translate(
                "products.list.messages.success.subtitle.short"
              )}`}
              {...field}
            />
          </FormItem>
        )}
      />
    </CustomCard>
  );
};
