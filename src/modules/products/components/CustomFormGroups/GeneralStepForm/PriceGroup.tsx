import { Col, Input, Row } from "antd";
import { DollarCircleOutlined, PercentageOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { CustomCard } from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/styled";
import { CustomStoreProductDto } from "../../StoreProductStepsForms/GeneralStepForm/types";

export const PriceGroup = () => {
  const { setValue, register } = useFormContext<CustomStoreProductDto>();

  return (
    <CustomCard title="Price">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <FormItem name="price" label="Base price">
            <Input
              min={0}
              size="large"
              type="number"
              prefix={<DollarCircleOutlined />}
              {...register("price", {
                valueAsNumber: true,
                onChange: (ev) => setValue("price", ev.target.value),
              })}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem name="tax" label="Tax">
            <Input
              min={0}
              size="large"
              type="number"
              prefix={<PercentageOutlined />}
              {...register("tax", {
                valueAsNumber: true,
                onChange: (ev) => setValue("tax", ev.target.value),
              })}
            />
          </FormItem>
        </Col>
      </Row>
    </CustomCard>
  );
};
