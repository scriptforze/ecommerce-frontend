import { Button, Col, Row, Select, Space, Typography } from "antd";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormItem } from "@/modules/common/components";
import { CustomSpace } from "@/modules/products/components/ProductForms/GeneralStepForm/styled";
import { useGetAllProductAttributesQuery } from "@/services/productAttributes";
import { CustomStoreProductDto } from "../../../types";
import { AttributesHeader } from "./styled";

export const AttributesGroup = () => {
  const { Text, Title } = Typography;
  const { control, watch, setValue } = useFormContext<CustomStoreProductDto>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_attribute_options",
  });

  const watchProductAttributeOptions = watch("product_attribute_options");

  const [attributeValues, setAttributeValues] = useState<{
    [key: number]: { id: number; name: string }[];
  }>({});

  const {
    data: attributes,
    isSuccess: isAttributesSuccess,
    isFetching: isAttributesFetching,
  } = useGetAllProductAttributesQuery({
    perPage: 100,
    include: "product_attribute_options",
  });

  useEffect(() => {
    if (!isAttributesFetching && isAttributesSuccess) {
      const attrOptions = attributes?.data?.reduce((result, current) => {
        const options =
          current.product_attribute_options?.map((opt) => {
            const { id, name } = opt;
            return { id, name };
          }) || [];
        return { ...result, [current.id]: options };
      }, {} as { [key: number]: { id: number; name: string }[] });
      setAttributeValues(attrOptions || {});
    }
  }, [isAttributesSuccess, isAttributesFetching]);

  const removeAttribute = (index: number) => {
    remove(index);
  };

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchProductAttributeOptions[index],
  }));

  return (
    <>
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
      {controlledFields.map((field, index) => {
        return (
          <Row key={field.id} gutter={[24, 24]}>
            <Col span={12}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please select an attribute",
                  },
                }}
                name={`product_attribute_options.${index}.attribute`}
                render={({ field: attributeField, fieldState: { error } }) => (
                  <FormItem label="Name/Type" required>
                    <Select
                      size="large"
                      fieldNames={{
                        value: "id",
                        label: "name",
                      }}
                      onChange={(value) => {
                        attributeField.onChange(value);
                        setValue(
                          `product_attribute_options.${index}.value`,
                          []
                        );
                      }}
                      status={error && "error"}
                      style={{ width: "100%" }}
                      options={attributes?.data}
                      value={attributeField.value}
                      placeholder="Please select an attribute"
                    />
                    <Text type="danger">{error?.message}</Text>
                  </FormItem>
                )}
              />
            </Col>
            <Col span={index === 0 ? 12 : 10}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please select a least one value",
                  },
                }}
                name={`product_attribute_options.${index}.value`}
                render={({ field: optionsField, fieldState: { error } }) => (
                  <FormItem label="Values:" required>
                    <Select
                      allowClear
                      mode="tags"
                      size="large"
                      status={error && "error"}
                      style={{ width: "100%" }}
                      value={optionsField.value}
                      onChange={optionsField.onChange}
                      fieldNames={{ label: "name", value: "id" }}
                      placeholder="Please select attribute's options"
                      options={
                        field.attribute ? attributeValues[field.attribute] : []
                      }
                      disabled={
                        !field.attribute ||
                        !attributeValues[field.attribute]?.length
                      }
                    />
                    <Text type="danger">{error?.message}</Text>
                  </FormItem>
                )}
              />
            </Col>
            {index !== 0 && (
              <Col span={2}>
                <CustomSpace align="end" size={30}>
                  <Button
                    danger
                    type="link"
                    onClick={() => removeAttribute(index)}
                    style={{
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CloseCircleOutlined style={{ fontSize: 20 }} />
                  </Button>
                </CustomSpace>
              </Col>
            )}
          </Row>
        );
      })}
    </>
  );
};
