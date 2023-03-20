import {
  SaveOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { createContext, useContext } from "react";
import { INITIAL_STEP_BUTTONS_STATE } from "./constants";
import {
  StepButtonsState,
  ButtonStateAction,
  ProductCreationSteps,
} from "./types";

export const buttonStepReducer = (
  state: StepButtonsState,
  { currentStep }: ButtonStateAction
): StepButtonsState => {
  switch (currentStep) {
    case ProductCreationSteps.FIRST:
      return INITIAL_STEP_BUTTONS_STATE;
    case ProductCreationSteps.SECOND:
      return {
        currentStep,
        discard: {
          targetStep: 0,
          action: "back",
          title: "Previus",
          icon: <ArrowLeftOutlined />,
          className: "space-buttons__button--back",
        },
        submit: {
          targetStep: 2,
          action: "next",
          title: "Save & Next",
          icon: <ArrowRightOutlined />,
          className: "space-buttons__button--continue",
        },
      };
    case ProductCreationSteps.THIRD:
      return {
        currentStep,
        discard: {
          targetStep: 1,
          action: "back",
          title: "Previus",
          icon: <ArrowLeftOutlined />,
          className: "space-buttons__button--back",
        },
        submit: {
          targetStep: 2,
          title: "Finish",
          action: "submit",
          icon: <SaveOutlined />,
          className: "space-buttons__button--submit",
        },
      };
    default:
      return state;
  }
};

export const CustomProductStepperContext = createContext<{
  stepperState: StepButtonsState;
  stepButtonsDispatch: (value: ButtonStateAction) => void;
}>({
  stepperState: INITIAL_STEP_BUTTONS_STATE,
  stepButtonsDispatch: () => {},
});

export const useProductStepperContext = () => {
  const context = useContext(CustomProductStepperContext);
  if (!context)
    throw new Error(
      "useProductStepperContext must be used within the CustomProductStepperProvider"
    );
  return context;
};
