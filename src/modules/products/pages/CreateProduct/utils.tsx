import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { INITIAL_STEP_BUTTONS_STATE } from "./constants";
import {
  ButtonStateAction,
  ProductCreationSteps,
  StepButtonsState,
} from "./types";

export const buttonStepReducer = (
  state: StepButtonsState,
  action: ButtonStateAction
): StepButtonsState => {
  switch (action.step) {
    case ProductCreationSteps.FIRST:
      return {
        ...state,
        ...INITIAL_STEP_BUTTONS_STATE,
      };
    case ProductCreationSteps.SECOND:
      return {
        ...state,
        step: action.step,
        discard: {
          nextStep: 0,
          title: "Previus",
          action: "next-back",
          icon: <ArrowLeftOutlined />,
          className: "space-buttons__button--back",
        },
        submit: {
          nextStep: 2,
          title: "Next",
          action: "next-back",
          icon: <ArrowRightOutlined />,
          className: "space-buttons__button--continue",
        },
      };
    case ProductCreationSteps.THIRD:
      return {
        ...state,
        step: action.step,
        discard: {
          nextStep: 1,
          title: "Previus",
          action: "next-back",
          icon: <ArrowLeftOutlined />,
          className: "space-buttons__button--back",
        },
        submit: {
          nextStep: 2,
          title: "Save",
          action: "submit",
          icon: <SaveOutlined />,
          className: "space-buttons__button--submit",
        },
      };
    default:
      return { ...state };
  }
};
