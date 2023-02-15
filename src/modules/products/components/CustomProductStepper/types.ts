import { ReactElement, ReactNode } from "react";

export interface CustomProductStepperProps {
  affixed: boolean;
  onNext?: () => void;
  onPrevius?: () => void;
  state: StepButtonsState;
  onAffixChanged: (isAffixed?: boolean) => void;
}

export type ButtonStateAction = { currentStep: number };
export type ButtonActions = "next" | "back" | "submit" | "discard";

export interface ButtonState {
  title: string;
  className: string;
  targetStep: number;
  icon: ReactElement;
  action: ButtonActions;
}

export interface StepButtonsState {
  currentStep: number;
  submit: ButtonState;
  discard: ButtonState;
}

export enum ProductCreationSteps {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
}

export interface CustomProductStepperProviderProps {
  children: ReactNode;
}
