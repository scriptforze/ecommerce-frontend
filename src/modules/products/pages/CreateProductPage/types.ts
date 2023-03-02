import { FormInstance } from "antd";

export interface StepScreenProps {
  affixed: boolean;
  form: FormInstance;
  currentStep: number;
  onSubmit?: (values: unknown) => void;
}
