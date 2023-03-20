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
import { useLangTranslation } from "@/modules/common/hooks";
import { useGetAllProductSpecificationsByProductQuery } from "@/services/productSpecifications";

export const SpecificationsStepForm = ({
  product,
}: SpecificationsStepFormProps) => {
  const navigate = useNavigate();
  const [affixed, setAffixed] = useState(false);
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();

  const { lang } = useLangTranslation();
  const { isFetching, data: specifications } =
    useGetAllProductSpecificationsByProductQuery({
      lang,
      product: product.id,
      include: "status",
    });

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
        onNext={() => navigate(`${ProductsRoutesList.PRODUCTS}`)}
      />
      <TableContainer $affixed={affixed}>
        <ProductSpecsTable
          product={product}
          isFetching={isFetching}
          specifications={specifications?.data}
        />
      </TableContainer>
    </>
  );
};
