import { useEffect } from "react";
import { PageHeader } from "@/modules/common/components";
import { useAppSelector, useLangTranslation } from "@/modules/common/hooks";
import { SpecificationsStepForm } from "@/modules/products/components";
import {
  ProductCreationSteps,
  useProductStepperContext,
} from "@/modules/products/components/CustomProductStepper";

export const EditSpecificationsStepPage = () => {
  const { translate } = useLangTranslation();
  document.title = `Ecommerce - ${translate("products.form.title.update")}`;
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();
  const { product } = useAppSelector((state) => state.products);
  const { currentStep } = stepperState;

  useEffect(() => {
    if (product && currentStep !== ProductCreationSteps.THIRD)
      stepButtonsDispatch({ currentStep: ProductCreationSteps.THIRD });
  }, [product, currentStep]);

  return (
    <>
      <PageHeader
        title={translate("products.form.title.productSpecifications")}
      />
      <SpecificationsStepForm product={product!} />
    </>
  );
};
