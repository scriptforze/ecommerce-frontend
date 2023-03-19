import { Col, Input, Row, Typography } from "antd";
import { DollarCircleOutlined, PercentageOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { CustomStoreProductDto } from "../../types";
import { CustomCard } from "@/modules/products/components/CustomCard";

export const PriceGroup = () => {
  const { Text } = Typography;
  const { control } = useFormContext<CustomStoreProductDto>();

  return (
    <CustomCard title="Price">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Controller
            name="price"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Price is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Base price:" required>
                <Input
                  min={0}
                  size="large"
                  type="number"
                  status={error && "error"}
                  prefix={<DollarCircleOutlined />}
                  {...field}
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </FormItem>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="tax"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Tax is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Tax:" required>
                <Input
                  min={0}
                  size="large"
                  type="number"
                  status={error && "error"}
                  prefix={<PercentageOutlined />}
                  {...field}
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </FormItem>
            )}
          />
        </Col>
      </Row>
    </CustomCard>
  );
};
