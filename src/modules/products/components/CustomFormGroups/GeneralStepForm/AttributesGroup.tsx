import { Button, Col, Row, Select, Space, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormItem } from "@/modules/common/components";
import {
  CustomCard,
  AttributesHeader,
  CustomSpace,
} from "@/modules/products/components/StoreProductStepsForms/GeneralStepForm/styled";
import { useGetAllProductAttributesQuery } from "@/services/productAttributes";
import { useGetAllProductAttributeOptionsByProductAttributeQuery } from "@/services/productAttributeOptions";
import { CustomStoreProductDto } from "../../StoreProductStepsForms/GeneralStepForm/types";

export const AttributesGroup = () => {
  const { Text, Title } = Typography;
  const { control } = useFormContext<CustomStoreProductDto>();

  const [attributeValues, setAttributeValues] = useState<{
    [key: number]: { id: number; name: string }[];
  }>({});
  const [currentProductAttribute, setCurrentProductAttribute] = useState<
    number[]
  >([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_attribute_options",
  });

  const { data: attributes } = useGetAllProductAttributesQuery({
    perPage: 100,
  });

  const [attrIndex, productAttribute] = currentProductAttribute;
  const skip = !productAttribute && !attrIndex;

  const {
    isSuccess,
    isFetching,
    data: options,
  } = useGetAllProductAttributeOptionsByProductAttributeQuery(
    { productAttribute },
    { skip }
  );

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const attrOptions =
        options.data?.map((opt) => {
          const { id, name } = opt;
          return { id, name };
        }) || [];

      setAttributeValues((currentOptions) => ({
        ...currentOptions,
        [attrIndex]: attrOptions,
      }));
    }
  }, [isSuccess, isFetching, options, attrIndex]);

  const removeAttribute = (index: number) => {
    remove(index);
  };

  return (
    <CustomCard>
      <AttributesHeader>
        <Col span={24}>
          <Space className="attributes-header">
            <Title level={5} className="attributes-header__attribute--title">
              Attributes
            </Title>
            <Button
              type="link"
              size="large"
              onClick={() => append({})}
              icon={<PlusCircleOutlined />}
              className="attributes-header__attribute--addbutton"
            >
              Add new attribute
            </Button>
          </Space>
        </Col>
      </AttributesHeader>
      {fields &&
        fields.map((field, index) => (
          <Row key={field.id} gutter={[24, 24]}>
            <Col span={10}>
              <FormItem>
                <Text type="secondary">
                  Name/Type
                  <Text type="danger"> *</Text>
                </Text>
                <Controller
                  control={control}
                  name={`product_attribute_options.${index}.attribute`}
                  render={({ field: attributeField }) => (
                    <Select
                      size="large"
                      fieldNames={{
                        value: "id",
                        label: "name",
                      }}
                      onChange={(value) => {
                        attributeField.onChange(value);
                        setCurrentProductAttribute([index, value]);
                      }}
                      style={{ width: "100%" }}
                      options={attributes?.data}
                      placeholder="Please select an attribute"
                    />
                  )}
                />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem>
                <Text type="secondary">
                  Values
                  <Text type="danger"> *</Text>
                </Text>
                <Controller
                  control={control}
                  name={`product_attribute_options.${index}.value`}
                  render={({ field: optionsField }) => (
                    <Select
                      allowClear
                      mode="tags"
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Please select attribute's options"
                      options={attributeValues[index]}
                      onChange={optionsField.onChange}
                      disabled={!attributeValues[index]?.length}
                      fieldNames={{ label: "name", value: "id" }}
                    />
                  )}
                />
              </FormItem>
            </Col>
            <Col span={4}>
              <CustomSpace align="end" size={20}>
                <Button
                  danger
                  type="link"
                  size="large"
                  onClick={() => removeAttribute(index)}
                >
                  Remove
                </Button>
              </CustomSpace>
            </Col>
          </Row>
        ))}
    </CustomCard>
  );
};
