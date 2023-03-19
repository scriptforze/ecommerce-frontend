import { useState } from "react";
import { Button, Col, Row, Select, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { RetweetOutlined } from "@ant-design/icons";
import { ProductsRoutesList } from "@/modules/products/routes";
import {
  CustomProductStepper,
  useProductStepperContext,
} from "@/modules/products/components/CustomProductStepper";
import {
  AttributeVariations,
  CustomStocksStepFormValues,
  StocksStepFormProps,
} from "./types";
import { CustomCard, CustomForm } from "@/modules/products/components";
import { AttributesGroup } from "../CommonFormGroups";
import { parseProductAttributesOptions } from "@/modules/products/helpers";
import { useGetAllProductAttributesQuery } from "@/services/productAttributes";
import { FormItemHorizontal } from "./styled";
import { getVariationsGroupedByAttribute } from "./utils";
import { StockVariationCard } from "./StockVariationCard";

export const StocksStepForm = ({ product }: StocksStepFormProps) => {
  const theme = useTheme();
  const { Text } = Typography;
  const navigate = useNavigate();
  const [affixed, setAffixed] = useState(false);
  const [attribute, setAttribute] = useState<number | null>(null);
  const [variations, setVariations] = useState<AttributeVariations[]>([]);
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();

  const parsedProductAttributesOptions = parseProductAttributesOptions(
    product?.product_attribute_options
  );

  const form = useForm<CustomStocksStepFormValues>({
    mode: "onChange",
    defaultValues: {
      variationsGroupedByAttributeId: attribute,
      product_attribute_options: parsedProductAttributesOptions,
    },
  });

  const { data: attributes, isFetching: isAttributesFetching } =
    useGetAllProductAttributesQuery({
      perPage: 100,
      include: "product_attribute_options",
    });

  const options = form.getValues("product_attribute_options");
  const optionsValues = options.flatMap((option) => option.value || []);

  const onAffixChanged = (affixValue?: boolean) => {
    const isAffixed = affixValue || false;
    setAffixed(isAffixed);
  };

  const onPrevious = () => {
    const { targetStep, action } = stepperState.discard;
    stepButtonsDispatch({ currentStep: targetStep });

    if (action === "discard") {
      navigate(ProductsRoutesList.PRODUCTS);
    }
  };

  const onSubmit = (data: CustomStocksStepFormValues) => {
    console.log(data);
  };

  const generateVariations = () => {
    if (!attribute) {
      const [option] = options;
      setAttribute(option.attribute!);
      form.setValue("variationsGroupedByAttributeId", option.attribute!);
    }

    const selectedAttributeId = form.getValues(
      "variationsGroupedByAttributeId"
    );

    const selectedAttribute = attributes?.data?.find(
      (attr) => attr.id === selectedAttributeId
    );

    const variationsByAttribute = getVariationsGroupedByAttribute(
      selectedAttribute!,
      optionsValues,
      attributes?.data
    );

    setVariations(variationsByAttribute);
  };

  return (
    <FormProvider {...form}>
      <CustomProductStepper
        isEditting
        affixed={affixed}
        onPrevius={onPrevious}
        onAffixChanged={onAffixChanged}
        isProductVariable={product!.is_variable}
        onNext={form.handleSubmit(onSubmit)}
      />
      <CustomForm layout="vertical" autoComplete="off" $affixed={affixed}>
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <CustomCard>
            <AttributesGroup />
          </CustomCard>
          <Row>
            <Col span={16} style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.token?.colorTextTertiary,
                }}
              >
                A continuación debes generar las variaciones de tu producto de
                acuerdo a los atributos que creaste previamente. Si das click al
                botón de <strong>Generar variaciones automáticamente</strong>,
                la plataforma creará las variaciones por ti para ahorrarte
                tiempo ó tambien puedes hacerlo de forma manual.
              </Text>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Button
                block
                type="primary"
                onClick={generateVariations}
                disabled={!optionsValues.length}
              >
                <RetweetOutlined />
                Generar variaciones automaticamente
              </Button>
            </Col>
          </Row>

          {attribute && (
            <>
              <Controller
                rules={{
                  required: {
                    value: true,
                    message: "Please select an attribute",
                  },
                }}
                control={form.control}
                name="variationsGroupedByAttributeId"
                render={({ field: attributeField, fieldState: { error } }) => (
                  <FormItemHorizontal
                    required
                    label="Name/Type"
                    style={{ width: "30%" }}
                  >
                    <Select
                      size="large"
                      fieldNames={{
                        value: "id",
                        label: "name",
                      }}
                      style={{ width: "100%" }}
                      status={error && "error"}
                      options={attributes?.data}
                      loading={isAttributesFetching}
                      disabled={isAttributesFetching}
                      placeholder="Please select an attribute"
                      onChange={(value) => {
                        attributeField.onChange(value);
                      }}
                      value={
                        attributes?.data?.length
                          ? attributeField.value
                          : undefined
                      }
                    />
                    <Text type="danger">{error?.message}</Text>
                  </FormItemHorizontal>
                )}
              />
              {variations.map((variation) => (
                <StockVariationCard
                  key={variation.option.name}
                  attributeVariations={variation}
                />
              ))}
            </>
          )}
        </Space>
      </CustomForm>
    </FormProvider>
  );
};
