import { Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { CustomCard } from "@/modules/products/components/ProductForms/GeneralStepForm/styled";
import { characterCount } from "@/modules/products/components/ProductForms/GeneralStepForm/utils";
import { CustomStoreProductDto } from "../../types";

export const OtherInfoGroup = () => {
  const { Text } = Typography;
  const { control } = useFormContext<CustomStoreProductDto>();
  return (
    <CustomCard title="Additional product data">
      <Controller
        control={control}
        name="description"
        rules={{
          required: { value: true, message: "Description is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Description:" required>
            <Input.TextArea
              rows={8}
              size="large"
              maxLength={750}
              status={error && "error"}
              placeholder="Description"
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
