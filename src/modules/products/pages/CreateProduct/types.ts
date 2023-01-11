import { ReactElement } from "react";

export type ButtonStateAction = { step: number };
export type ButtonActions = "next-back" | "submit" | "discard";

export enum ProductCreationSteps {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
}

export interface StepScreenProps {
  step: number;
  affixed: boolean;
}

export interface ButtonState {
  title: string;
  nextStep: number;
  className: string;
  icon: ReactElement;
  action: ButtonActions;
}

export interface StepButtonsState {
  step: number;
  discard: ButtonState;
  submit: ButtonState;
}
