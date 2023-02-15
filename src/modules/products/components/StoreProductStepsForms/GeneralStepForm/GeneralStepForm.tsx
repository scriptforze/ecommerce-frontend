import { Row, Col, Space } from "antd";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { CustomStoreProductDto } from "./types";

export const GeneralStepForm = () => {
  const methods = useForm<CustomStoreProductDto>({
    mode: "onChange",
    defaultValues: { product_attribute_options: [{}] },
  });
  const [affixed, setAffixed] = useState(false);
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();

  const spacingCards = 15;

  const onAffixChanged = (affixValue?: boolean) => {
    const isAffixed = affixValue || false;
    setAffixed(isAffixed);
  };

  const onPrevious = () => {
    const { targetStep } = stepperState.discard;
    stepButtonsDispatch({ currentStep: targetStep });
  };

  const onSubmit = (data: CustomStoreProductDto) => {
    console.log(data);
    const { targetStep } = stepperState.submit;
    stepButtonsDispatch({ currentStep: targetStep });
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
      <FormGeneralStep
        layout="vertical"
        autoComplete="off"
        $affixed={affixed}
        encType="multipart/form-data"
      >
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
              direction="vertical"
              size={spacingCards}
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
