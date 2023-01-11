import { Card, Steps, Row, Col, Button } from "antd";
import { useState, useReducer } from "react";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import {
  STEPS_ITEMS,
  BREADCRUMB_ITEMS,
  INITIAL_STEP_BUTTONS_STATE,
} from "./constants";
import {
  GeneralStep,
  CustomAffixContainer,
} from "@/modules/products/components";
import { StyledSpace, StyledSpaceButtons } from "./styled";
import { buttonStepReducer } from "./utils";
import { ButtonActions } from "./types";

export const CreateProduct = () => {
  document.title = "Ecommerce - New Product";
  const [affixed, setAffixed] = useState(false);

  const [stepButtonsState, stepButtonsDispatch] = useReducer(
    buttonStepReducer,
    INITIAL_STEP_BUTTONS_STATE
  );

  const { submit, discard, step } = stepButtonsState;

  const dispatchButtonAction = (action: ButtonActions, nextStep: number) => {
    switch (action) {
      case "next-back":
        stepButtonsDispatch({ step: nextStep });
        break;
      default:
        throw Error(`dispatchButtonAction: ${action} not supported yet.`);
    }
  };

  const onAffixChanged = (affixValue?: boolean) => {
    const isAffixed = affixValue || false;
    setAffixed(isAffixed);
  };

  const onSubmit = () => {
    stepButtonsDispatch({ step });
    const { action, nextStep } = submit;
    dispatchButtonAction(action, nextStep);
  };

  const onDiscard = () => {
    stepButtonsDispatch({ step });
    const { action, nextStep } = discard;
    dispatchButtonAction(action, nextStep);
  };

  return (
    <>
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <CustomAffixContainer
        offsetTop={64}
        $affixed={affixed}
        onChange={onAffixChanged}
      >
        <Card>
          <Row justify="space-evenly" gutter={[24, 24]}>
            <Col span={7}>
              <StyledSpace $affixed={affixed}>
                <h2>{BREADCRUMB_ITEMS[1].title}</h2>
              </StyledSpace>
            </Col>
            <Col span={10}>
              <Steps
                current={step}
                items={STEPS_ITEMS}
                labelPlacement="vertical"
              />
            </Col>
            <Col span={7}>
              <StyledSpaceButtons className="space-buttons">
                <Button
                  icon={discard.icon}
                  onClick={onDiscard}
                  className={discard.className}
                >
                  {discard.title}
                </Button>
                <Button
                  icon={submit.icon}
                  onClick={onSubmit}
                  className={submit.className}
                >
                  {submit.title}
                </Button>
              </StyledSpaceButtons>
            </Col>
          </Row>
        </Card>
      </CustomAffixContainer>
      <GeneralStep $affixed={affixed} />
    </>
  );
};
