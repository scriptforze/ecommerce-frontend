import { Controller, useFormContext } from "react-hook-form";
import { Col, Input, Row, Typography } from "antd";
import { CustomProductFormValues } from "@/modules/products/components/ProductForms/GeneralStepForm/types";
import { FormItem } from "@/modules/common/components";

export const ProductStockGroup = () => {
  const { Text } = Typography;
  const { control } = useFormContext<CustomProductFormValues>();
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="width"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Width is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Width:" required>
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder="Enter the product width"
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </FormItem>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="height"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Height is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Height:" required>
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder="Enter the product height"
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </FormItem>
            )}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="length"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Length is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Length:" required>
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder="Enter the product length"
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </FormItem>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="weight"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Weight is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Weight:" required>
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder="Enter the product weight"
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </FormItem>
            )}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Stock is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Stock:" required>
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder="Enter the product stock"
                />
                <Text type="danger">{error?.message} &nbsp;</Text>
              </FormItem>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
