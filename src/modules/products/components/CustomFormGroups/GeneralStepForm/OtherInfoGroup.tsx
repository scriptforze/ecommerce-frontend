import { Input } from "antd";
import { useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { CustomCard } from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/styled";
import { characterCount } from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/utils";
import { StoreProductDto } from "@/services/products";

export const OtherInfoGroup = () => {
  const { register, setValue } = useFormContext<StoreProductDto>();
  return (
    <CustomCard title="Additional product data">
      <FormItem label="Description">
        <Input.TextArea
          rows={8}
          size="large"
          maxLength={750}
          placeholder="Description"
          showCount={characterCount}
          {...register("description", {
            required: true,
            onChange: (ev) => setValue("description", ev.target.value),
          })}
        />
      </FormItem>
    </CustomCard>
  );
};
