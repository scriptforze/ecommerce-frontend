import { Input } from "antd";
import { useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { CustomCard } from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/styled";
import { characterCount } from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/utils";
import { CustomStoreProductDto } from "../../StoreProductStepsForms/GeneralStepForm/types";

export const BasicInfoGroup = () => {
  const { register, setValue } = useFormContext<CustomStoreProductDto>();

  return (
    <CustomCard title="Basic Information">
      <FormItem label="Product name">
        <Input
          size="large"
          placeholder="Product name"
          {...register("name", {
            required: true,
            onChange: (ev) => setValue("name", ev.target.value),
          })}
        />
      </FormItem>

      <FormItem label="Short product description">
        <Input.TextArea
          rows={4}
          size="large"
          maxLength={250}
          showCount={characterCount}
          placeholder="Short product description"
          {...register("short_description", {
            onChange: (ev) => setValue("short_description", ev.target.value),
          })}
        />
      </FormItem>
    </CustomCard>
  );
};
