import { Controller, useFormContext } from "react-hook-form";
import { Col, Input, Row, Typography } from "antd";
import { CustomProductFormValues } from "@/modules/products/components/ProductForms/GeneralStepForm/types";
import { useLangTranslation } from "@/modules/common/hooks";
import { FormItem } from "@/modules/common/components";

export const ProductStockGroup = () => {
  const { translate } = useLangTranslation();
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
                message: translate(
                  "products.list.messages.success.validation.requireWidth"
                ),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={`${translate("products.list.dimensions.width")}:`}
                required
              >
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder={translate(
                    "products.list.placeholder.enterProductWidth"
                  )}
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
                message: translate(
                  "products.list.messages.success.validation.requireHeight"
                ),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={`${translate("products.list.dimensions.height")}:`}
                required
              >
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder={translate(
                    "products.list.placeholder.enterProductHeight"
                  )}
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
                message: translate(
                  "products.list.messages.success.validation.requireLength"
                ),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={`${translate("products.list.dimensions.length")}:`}
                required
              >
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder={translate(
                    "products.list.placeholder.enterProductLength"
                  )}
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
                message: translate(
                  "products.list.messages.success.validation.requireWeight"
                ),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={`${translate("products.list.dimensions.weight")}:`}
                required
              >
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder={translate(
                    "products.list.placeholder.enterProductWeight"
                  )}
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
                message: translate(
                  "products.list.messages.success.validation.requireStock"
                ),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={`${translate("products.list.dimensions.stock")}:`}
                required
              >
                <Input
                  {...field}
                  type="number"
                  status={error && "error"}
                  placeholder={translate(
                    "products.list.placeholder.enterProductStock"
                  )}
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
