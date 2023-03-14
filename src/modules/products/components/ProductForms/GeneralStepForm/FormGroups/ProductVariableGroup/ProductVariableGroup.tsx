import { Controller, useFormContext } from "react-hook-form";
import { Divider, Switch, Typography } from "antd";
import { CustomStoreProductDto } from "@/modules/products/components/ProductForms/GeneralStepForm/types";
import { CustomCard } from "@/modules/products/components/ProductForms/GeneralStepForm/styled";
import { AttributesGroup } from "./AttributesGroup";
import { ProductStockGroup } from "./ProductStockGroup";

export const ProductVariableGroup = () => {
  const { Text } = Typography;
  const { control, getValues, watch } = useFormContext<CustomStoreProductDto>();
  const isVariable = getValues("is_variable");
  watch("is_variable");

  return (
    <CustomCard>
      <Divider orientation="left" orientationMargin={0}>
        <Text>Is the product variable? &nbsp;</Text>
        <Controller
          control={control}
          name="is_variable"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </Divider>
      {isVariable ? <AttributesGroup /> : <ProductStockGroup />}
    </CustomCard>
  );
};
