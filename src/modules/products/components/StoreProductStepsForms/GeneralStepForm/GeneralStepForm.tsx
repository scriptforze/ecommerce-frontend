import { Row, Col, Space } from "antd";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormGeneralStep } from "./styled";
import {
  PriceGroup,
  ImagesGroup,
  BasicInfoGroup,
  OtherInfoGroup,
  AttributesGroup,
  CategoryTagsGroup,
} from "../../CustomFormGroups";
import { CustomProductStepper } from "../../CustomProductStepper/CustomProductStepper";
import { useProductStepperContext } from "../../CustomProductStepper/utils";
import { ActionToPerform, CustomStoreProductDto } from "./types";
import {
  StoreProductGeneralRequest,
  useSaveProductGeneralMutation,
} from "@/services/products";
import { parseDataByAction } from "./utils";
import { pushNotification } from "@/modules/common/helpers";
import { ProductsRoutesList } from "@/modules/products/routes";

export const GeneralStepForm = () => {
  const methods = useForm<CustomStoreProductDto>({
    mode: "onChange",
    defaultValues: { product_attribute_options: [{}] },
  });
  const navigate = useNavigate();
  const [affixed, setAffixed] = useState(false);
  const [formAction] = useState<ActionToPerform>("create");
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();

  const spacingCards = 15;

  const [createProduct, { isSuccess: isCreateProductSuccess }] =
    useSaveProductGeneralMutation();

  useEffect(() => {
    if (isCreateProductSuccess) {
      pushNotification({
        type: "success",
        title: "Product created",
        message: "Product was created successfully.",
      });

      const { targetStep } = stepperState.submit;
      stepButtonsDispatch({ currentStep: targetStep });
    }
  }, [isCreateProductSuccess]);

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

  const onSubmit = (data: CustomStoreProductDto) => {
    const parsedData = parseDataByAction(formAction, data);
    switch (formAction) {
      case "create": {
        const storeProductGeneralRequest =
          parsedData as StoreProductGeneralRequest;
        createProduct({ storeProductGeneralRequest });
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
        state={stepperState}
        onPrevius={onPrevious}
        onAffixChanged={onAffixChanged}
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
              <AttributesGroup />
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
