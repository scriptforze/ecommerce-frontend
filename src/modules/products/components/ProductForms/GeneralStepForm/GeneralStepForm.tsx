import { Row, Col, Space } from "antd";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormGeneralStep } from "./styled";
import {
  PriceGroup,
  ImagesGroup,
  BasicInfoGroup,
  OtherInfoGroup,
  CategoryTagsGroup,
  ProductVariableGroup,
} from "./FormGroups";
import { CustomProductStepper } from "../../CustomProductStepper/CustomProductStepper";
import { useProductStepperContext } from "../../CustomProductStepper/utils";
import {
  ActionToPerform,
  CustomStoreProductDto,
  GeneralStepFormProps,
} from "./types";
import {
  StoreProductGeneralRequest,
  useSaveProductGeneralMutation,
  SaveProductGeneralApiResponse,
} from "@/services/products";
import { parseDataByAction, parseProductAttributesOptions } from "./utils";
import { pushNotification } from "@/modules/common/helpers";
import { ProductsRoutesList } from "@/modules/products/routes";
import { ProductCreationSteps } from "@/modules/products/components/CustomProductStepper/types";

export const GeneralStepForm = ({ product }: GeneralStepFormProps) => {
  const parsedTags = product?.tags?.map((tag) => tag.id) || [];
  const parsedProductAttributesOptions = parseProductAttributesOptions(
    product?.product_attribute_options
  );

  const methods = useForm<CustomStoreProductDto>({
    mode: "onChange",
    defaultValues: {
      tags: parsedTags,
      tax: product?.tax,
      name: product?.name,
      price: product?.price,
      stock: product?.stock,
      width: product?.width,
      height: product?.height,
      length: product?.length,
      weight: product?.weight,
      description: product?.description,
      is_variable: product?.is_variable,
      category_id: product?.category?.id,
      short_description: product?.short_description,
      product_attribute_options: parsedProductAttributesOptions,
    },
  });
  const navigate = useNavigate();
  const [affixed, setAffixed] = useState(false);
  const isVariable = methods.getValues("is_variable");
  const [formAction] = useState<ActionToPerform>("create");
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();

  const spacingCards = 15;

  const [createProduct, { isLoading: isProductStoreLoading }] =
    useSaveProductGeneralMutation();

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

  const onRequestSuccess = ({ data }: SaveProductGeneralApiResponse) => {
    pushNotification({
      type: "success",
      title: "Product created",
      message: "Product was created successfully.",
    });

    const { targetStep } = stepperState.submit;

    const currentStep = data?.is_variable
      ? targetStep
      : ProductCreationSteps.THIRD;

    stepButtonsDispatch({ currentStep });

    const productStepPageToEdit = data?.is_variable
      ? ProductsRoutesList.PRODUCT_STOCKS
      : ProductsRoutesList.PRODUCT_FINISH;

    navigate(
      `${ProductsRoutesList.PRODUCTS}/${ProductsRoutesList.EDIT_PRODUCT}/${data?.id}/${productStepPageToEdit}`
    );
  };

  const onSubmit = (data: CustomStoreProductDto) => {
    const parsedData = parseDataByAction(formAction, data);
    switch (formAction) {
      case "create": {
        const storeProductGeneralRequest =
          parsedData as StoreProductGeneralRequest;
        createProduct({ storeProductGeneralRequest })
          .unwrap()
          .then(onRequestSuccess);
        break;
      }
      default:
        throw new Error(`The action ${formAction} is not supported`);
    }
  };

  return (
    <FormProvider {...methods}>
      <CustomProductStepper
        affixed={affixed}
        onPrevius={onPrevious}
        isEditting={!!product}
        isProductVariable={isVariable}
        onAffixChanged={onAffixChanged}
        isSubmitting={isProductStoreLoading}
        onNext={methods.handleSubmit(onSubmit)}
      />
      <FormGeneralStep layout="vertical" autoComplete="off" $affixed={affixed}>
        <Row gutter={[spacingCards, spacingCards]}>
          <Col span={15}>
            <Space
              size={spacingCards}
              direction="vertical"
              style={{ display: "flex" }}
            >
              <BasicInfoGroup />
              <OtherInfoGroup />
              <PriceGroup />
              <ProductVariableGroup />
            </Space>
          </Col>

          <Col span={9}>
            <Space
              size={spacingCards}
              direction="vertical"
              style={{ display: "flex" }}
            >
              <ImagesGroup />
              <CategoryTagsGroup />
            </Space>
          </Col>
        </Row>
      </FormGeneralStep>
    </FormProvider>
  );
};
