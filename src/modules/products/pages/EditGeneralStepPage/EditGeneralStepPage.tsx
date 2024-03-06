import { useEffect } from "react";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useAppSelector, useLangTranslation } from "@/modules/common/hooks";
import { GeneralStepForm } from "@/modules/products/components";
import {
  ProductCreationSteps,
  useProductStepperContext,
} from "@/modules/products/components/CustomProductStepper";

export const EditGeneralStepPage = () => {
  const { translate } = useLangTranslation();
  document.title = `Ecommerce - ${translate("products.form.title.update")}`;
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();
  const { product } = useAppSelector((state) => state.products);
  const { currentStep } = stepperState;

  useEffect(() => {
    if (product && currentStep !== ProductCreationSteps.FIRST)
      stepButtonsDispatch({ currentStep: ProductCreationSteps.FIRST });
  }, [product, currentStep]);

  return (
    <>
      <PageHeader
        title={translate("products.form.titleCreate.productGeneralInformation")}
      />
      <GeneralStepForm product={product!} />
    </>
  );
};
