import { Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { characterCount } from "@/modules/products/components/ProductForms/GeneralStepForm/utils";
import { CustomProductFormValues } from "../../types";
import { CustomCard } from "@/modules/products/components/CustomCard";

export const BasicInfoGroup = () => {
  const { Text } = Typography;
  const { control } = useFormContext<CustomProductFormValues>();

  return (
    <CustomCard title="Basic Information">
      <Controller
        name="name"
        control={control}
        rules={{
          required: { value: true, message: "Product name is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Product name:" required>
            <Input
              {...field}
              size="large"
              status={error && "error"}
              placeholder="Product name"
            />
            <Text type="danger">{error?.message} &nbsp;</Text>
          </FormItem>
        )}
      />

      <Controller
        control={control}
        name="short_description"
        render={({ field }) => (
          <FormItem label="Short product description:">
            <Input.TextArea
              rows={4}
              size="large"
              maxLength={250}
              showCount={characterCount}
              placeholder="Short product description"
              {...field}
            />
          </FormItem>
        )}
      />
    </CustomCard>
  );
};
