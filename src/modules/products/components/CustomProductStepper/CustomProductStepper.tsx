import { Button, Card, Col, Row } from "antd";
import {
  StyledSpace,
  StyledSpaceButtons,
} from "../../pages/CreateProductPage/styled";
import { CustomAffixContainer } from "../CustomAffixContainer";
import { useProductStepsItems } from "./hooks";
import { CustomStepProduct } from "./styled";
import { CustomProductStepperProps } from "./types";

export const CustomProductStepper = ({
  onNext,
  affixed,
  onPrevius,
  onAffixChanged,
  isProductVariable,
  isEditting = false,
  isSubmitting = false,
}: CustomProductStepperProps) => {
  const { stepperState, stepsItems } = useProductStepsItems({
    isEditting,
    isProductVariable,
  });
  const { submit, discard, currentStep } = stepperState;

  return (
    <CustomAffixContainer
      offsetTop={64}
      $affixed={affixed}
      onChange={onAffixChanged}
    >
      <Card>
        <Row justify="space-evenly" gutter={[24, 24]}>
          <Col sm={7} xs={24}>
            <StyledSpace $affixed={affixed}>
              <h2>New Product</h2>
            </StyledSpace>
          </Col>
          <Col sm={10} xs={24}>
            <CustomStepProduct
              responsive
              items={stepsItems}
              current={currentStep}
              labelPlacement="vertical"
            />
          </Col>
          <Col sm={7} xs={24}>
            <StyledSpaceButtons className="space-buttons">
              <Button
                icon={discard.icon}
                onClick={onPrevius}
                className={discard.className}
              >
                {discard.title}
              </Button>
              <Button
                onClick={onNext}
                icon={submit.icon}
                loading={isSubmitting}
                className={submit.className}
              >
                {submit.title}
              </Button>
            </StyledSpaceButtons>
          </Col>
        </Row>
      </Card>
    </CustomAffixContainer>
  );
};
