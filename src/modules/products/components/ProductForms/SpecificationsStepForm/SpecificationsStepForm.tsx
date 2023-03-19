import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CustomProductStepper,
  useProductStepperContext,
} from "@/modules/products/components/CustomProductStepper";
import { SpecificationsStepFormProps } from "./types";
import { ProductsRoutesList } from "@/modules/products/routes";
import { ProductSpecsTable } from "./ProductSpecsTable";
import { TableContainer } from "./styled";

export const SpecificationsStepForm = ({
  product,
}: SpecificationsStepFormProps) => {
  const navigate = useNavigate();
  const [affixed, setAffixed] = useState(false);
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();

  const onAffixChanged = (affixValue?: boolean) => {
    const isAffixed = affixValue || false;
    setAffixed(isAffixed);
  };

  const onPrevious = () => {
    const { targetStep, action } = stepperState.discard;
    stepButtonsDispatch({ currentStep: targetStep });

    if (action === "discard") {
      navigate(ProductsRoutesList.PRODUCTS);
    }
  };

  return (
    <>
      <CustomProductStepper
        isEditting
        affixed={affixed}
        onPrevius={onPrevious}
        onAffixChanged={onAffixChanged}
        isProductVariable={product!.is_variable}
        onNext={() => {}}
      />
      <TableContainer $affixed={affixed}>
        <ProductSpecsTable product={product} />
      </TableContainer>
    </>
  );
};
