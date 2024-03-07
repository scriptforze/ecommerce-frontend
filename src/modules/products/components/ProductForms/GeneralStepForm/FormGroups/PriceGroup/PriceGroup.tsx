import { Col, Input, Row, Typography } from "antd";
import { DollarCircleOutlined, PercentageOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/modules/common/components";
import { CustomProductFormValues } from "../../types";
import { useLangTranslation } from "@/modules/common/hooks";
import { CustomCard } from "@/modules/products/components/CustomCard";

export const PriceGroup = () => {
  const { Text } = Typography;
  const { translate } = useLangTranslation();
  const { control } = useFormContext<CustomProductFormValues>();

  return (
    <CustomCard title={translate("products.list.price")}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Controller
            name="price"
            control={control}
            rules={{
              required: {
                value: true,
                message: translate(
                  "products.list.messages.success.validation.requirePrice"
                ),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={translate(
                  "products.list.messages.success.subtitle.pricebase"
                )}
                required
              >
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
                message: translate(
                  "products.list.messages.success.validation.requireTax"
                ),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={translate("products.list.messages.success.subtitle.tax")}
                required
              >
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
