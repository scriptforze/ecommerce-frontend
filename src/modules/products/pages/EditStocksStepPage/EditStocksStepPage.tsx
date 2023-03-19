import { useEffect } from "react";
import { PageHeader } from "@/modules/common/components";
import { useAppSelector } from "@/modules/common/hooks";
import {
  ProductCreationSteps,
  useProductStepperContext,
} from "@/modules/products/components/CustomProductStepper";
import { StocksStepForm } from "@/modules/products/components";

export const EditStocksStepPage = () => {
  document.title = "Ecommerce - Edit Product";
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();
  const { product } = useAppSelector((state) => state.products);
  const { currentStep } = stepperState;

  useEffect(() => {
    if (product && currentStep !== ProductCreationSteps.SECOND)
      stepButtonsDispatch({ currentStep: ProductCreationSteps.SECOND });
  }, [product, currentStep]);

  return (
    <>
      <PageHeader title="Product variations" />
      <StocksStepForm product={product!} />
    </>
  );
};
