import { Button, Card, Col, Row } from "antd";
import {
  StyledSpace,
  CustomStepProduct,
  StyledSpaceButtons,
} from "../../pages/CreateProductPage/styled";
import { CustomAffixContainer } from "../CustomAffixContainer";
import { STEPS_ITEMS } from "./constants";
import { CustomProductStepperProps } from "./types";

export const CustomProductStepper = ({
  state,
  onNext,
  affixed,
  onPrevius,
  onAffixChanged,
}: CustomProductStepperProps) => {
  const { submit, discard, currentStep } = state;

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
              items={STEPS_ITEMS}
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
