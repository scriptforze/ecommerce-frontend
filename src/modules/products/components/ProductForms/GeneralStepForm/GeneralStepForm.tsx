import { Row, Col, Space, Card } from "antd";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import {
  PriceGroup,
  ImagesGroup,
  BasicInfoGroup,
  OtherInfoGroup,
  CategoryTagsGroup,
  ProductStockGroup,
} from "./FormGroups";
import { CustomProductStepper } from "../../CustomProductStepper/CustomProductStepper";
import { useProductStepperContext } from "../../CustomProductStepper/utils";
import { CustomProductFormValues, GeneralStepFormProps } from "./types";
import {
  useSaveProductGeneralMutation,
  SaveProductGeneralApiResponse,
  useUpdateProductGeneralMutation,
} from "@/services/products";
import { parseData } from "./utils";
import { isErrorWithMessage, pushNotification } from "@/modules/common/helpers";
import { ProductsRoutesList } from "@/modules/products/routes";
import { ProductCreationSteps } from "@/modules/products/components/CustomProductStepper/types";
import { parseProductAttributesOptions } from "@/modules/products/helpers";
import { CustomForm } from "../../CustomForm";
import { PRODUCT_INCLUDES } from "@/modules/products/constants";
import { useAppDispatch } from "@/modules/common/hooks";
import { setProduct } from "@/modules/products/store";

export const GeneralStepForm = ({ product }: GeneralStepFormProps) => {
  const dispatch = useAppDispatch();
  const parsedTags = product?.tags?.map((tag) => tag.id) || [];

  const [mainStock] = product?.product_stocks || [];
  const { length, height, width, weight, stock } = mainStock || {};

  const parsedImages =
    product?.images?.map((image) => ({
      id: image.id,
      url: image.urls.small,
    })) || [];

  const parsedProductAttributesOptions = parseProductAttributesOptions(
    product?.product_attribute_options
  );

  const methods = useForm<CustomProductFormValues>({
    mode: "onChange",
    defaultValues: {
      stock,
      width,
      length,
      height,
      weight,
      type: "product",
      tax: product?.tax,
      name: product?.name,
      price: product?.price,
      array_tags: parsedTags,
      array_images: parsedImages,
      tags: { attach: [], detach: [] },
      description: product?.description,
      images: { attach: [], detach: [] },
      category_id: product?.category?.id,
      is_variable: product?.is_variable || false,
      short_description: product?.short_description,
      product_attribute_options: parsedProductAttributesOptions,
    },
  });
  const navigate = useNavigate();
  const [affixed, setAffixed] = useState(false);
  const isVariable = methods.getValues("is_variable");
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();

  const [createProduct, { isLoading: isProductStoreLoading }] =
    useSaveProductGeneralMutation();

  const [updateProduct, { isLoading: isProductUpdateLoading }] =
    useUpdateProductGeneralMutation();

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

  const onRequestError = (error?: FetchBaseQueryError | SerializedError) => {
    if (error && isErrorWithMessage(error)) {
      const errors = error.data.error;
      if (typeof errors === "object") {
        Object.entries(errors).forEach((err) => {
          const [fieldType, message] = err || [];
          let field = fieldType as keyof CustomProductFormValues;
          field = field === "images" ? "array_images" : field;

          methods.setError(field, {
            type: "custom",
            message: message.join("\r\n"),
          });
        });
      }
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

    if (product && data) {
      dispatch(setProduct({ product: data }));
    }

    navigate(
      `${ProductsRoutesList.PRODUCTS}/${ProductsRoutesList.EDIT_PRODUCT}/${data?.id}/${productStepPageToEdit}`
    );
  };

  const onSubmit = (data: CustomProductFormValues) => {
    const parsedData = parseData(data, product);

    if (!product) {
      createProduct({
        include: PRODUCT_INCLUDES,
        storeProductGeneralRequest: { ...parsedData },
      })
        .unwrap()
        .then(onRequestSuccess)
        .catch(onRequestError);
    } else {
      updateProduct({
        product: product.id,
        include: PRODUCT_INCLUDES,
        updateProductGeneralRequest: { ...parsedData },
      })
        .unwrap()
        .then(onRequestSuccess);
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
        onNext={methods.handleSubmit(onSubmit)}
        isSubmitting={isProductStoreLoading || isProductUpdateLoading}
      />
      <CustomForm layout="vertical" autoComplete="off" $affixed={affixed}>
        <Row gutter={[15, 15]}>
          <Col span={15}>
            <Space size={15} direction="vertical" style={{ display: "flex" }}>
              <BasicInfoGroup />
              <OtherInfoGroup />
              <PriceGroup />
              <Card>
                <ProductStockGroup />
              </Card>
            </Space>
          </Col>

          <Col span={9}>
            <Space size={15} direction="vertical" style={{ display: "flex" }}>
              <ImagesGroup />
              <CategoryTagsGroup />
            </Space>
          </Col>
        </Row>
      </CustomForm>
    </FormProvider>
  );
};
