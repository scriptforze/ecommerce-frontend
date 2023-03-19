import { useEffect } from "react";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useAppSelector } from "@/modules/common/hooks";
import { GeneralStepForm } from "@/modules/products/components";
import {
  ProductCreationSteps,
  useProductStepperContext,
} from "@/modules/products/components/CustomProductStepper";

export const EditGeneralStepPage = () => {
  document.title = "Ecommerce - Edit Product";
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();
  const { product } = useAppSelector((state) => state.products);
  const { currentStep } = stepperState;

  useEffect(() => {
    if (product && currentStep !== ProductCreationSteps.FIRST)
      stepButtonsDispatch({ currentStep: ProductCreationSteps.FIRST });
  }, [product, currentStep]);

  return (
    <>
      <PageHeader title="Product general information" />
      <GeneralStepForm product={product!} />
    </>
  );
};
