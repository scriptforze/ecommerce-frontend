import { useEffect } from "react";
import { PageHeader } from "@/modules/common/components";
import { useAppSelector } from "@/modules/common/hooks";
import { SpecificationsStepForm } from "@/modules/products/components";
import {
  ProductCreationSteps,
  useProductStepperContext,
} from "@/modules/products/components/CustomProductStepper";

export const EditSpecificationsStepPage = () => {
  document.title = "Ecommerce - Edit Product";
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();
  const { product } = useAppSelector((state) => state.products);
  const { currentStep } = stepperState;

  useEffect(() => {
    if (product && currentStep !== ProductCreationSteps.THIRD)
      stepButtonsDispatch({ currentStep: ProductCreationSteps.THIRD });
  }, [product, currentStep]);

  return (
    <>
      <PageHeader title="Product specifications" />
      <SpecificationsStepForm product={product!} />
    </>
  );
};
