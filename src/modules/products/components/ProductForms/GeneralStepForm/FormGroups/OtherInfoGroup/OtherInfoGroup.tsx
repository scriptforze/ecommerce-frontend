import { Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { characterCount } from "@/modules/products/components/ProductForms/GeneralStepForm/utils";
import { CustomProductFormValues } from "../../types";
import { useLangTranslation } from "@/modules/common/hooks";
import { CustomCard } from "@/modules/products/components/CustomCard";

export const OtherInfoGroup = () => {
  const { translate } = useLangTranslation();
  const { Text } = Typography;
  const { control } = useFormContext<CustomProductFormValues>();
  return (
    <CustomCard title={translate("products.list.additionalProductData")}>
      <Controller
        control={control}
        name="description"
        rules={{
          required: {
            value: true,
            message: translate(
              "products.list.messages.success.validation.requireDescription"
            ),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormItem
            label={translate(
              "products.list.messages.success.subtitle.description"
            )}
            required
          >
            <Input.TextArea
              rows={8}
              size="large"
              maxLength={750}
              status={error && "error"}
              placeholder={translate(
                "products.list.messages.success.subtitle.description"
              )}
              showCount={characterCount}
              {...field}
            />
            <Text type="danger">{error?.message} &nbsp;</Text>
          </FormItem>
        )}
      />
    </CustomCard>
  );
};
