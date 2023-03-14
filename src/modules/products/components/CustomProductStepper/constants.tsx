import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { ButtonState, StepButtonsState } from "./types";

export const INITIAL_DISCARD_BUTTON_STATE: ButtonState = {
  targetStep: 0,
  title: "Discard",
  action: "discard",
  icon: <CloseOutlined />,
  className: "space-buttons__button--discard",
};

export const INITIAL_SUBMIT_BUTTON_STATE: ButtonState = {
  targetStep: 1,
  action: "next",
  title: "Save & Next",
  icon: <ArrowRightOutlined />,
  className: "space-buttons__button--continue",
};

export const INITIAL_STEP_BUTTONS_STATE: StepButtonsState = {
  currentStep: 0,
  submit: INITIAL_SUBMIT_BUTTON_STATE,
  discard: INITIAL_DISCARD_BUTTON_STATE,
};
