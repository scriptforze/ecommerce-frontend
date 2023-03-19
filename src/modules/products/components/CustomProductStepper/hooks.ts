import { StepProps } from "antd";
import { useNavigate } from "react-router-dom";
import { ProductsRoutesList } from "@/modules/products/routes";
import { ProductCreationSteps, UseProductStepsItemsProps } from "./types";
import { useProductStepperContext } from "./utils";
import { useAppSelector } from "@/modules/common/hooks";

export const useProductStepsItems = ({
  isEditting,
  isProductVariable,
}: UseProductStepsItemsProps) => {
  const navigate = useNavigate();
  const { product } = useAppSelector((state) => state.products);
  const { stepperState, stepButtonsDispatch } = useProductStepperContext();
  const { currentStep } = stepperState;
  const {
    PRODUCTS,
    EDIT_PRODUCT,
    PRODUCT_FINISH,
    PRODUCT_STOCKS,
    PRODUCT_GENERAL,
  } = ProductsRoutesList;

  const stepsItems: StepProps[] = [
    {
      title: "General",
      className: "step",
      onClick: () => {
        if (isEditting && currentStep !== ProductCreationSteps.FIRST) {
          stepButtonsDispatch({ currentStep: ProductCreationSteps.FIRST });
          navigate(
            `${PRODUCTS}/${EDIT_PRODUCT}/${product?.id}/${PRODUCT_GENERAL}`
          );
        }
      },
    },
    {
      title: "Variations",
      disabled: !isProductVariable,
      className: `${isProductVariable ? "step" : "step--disabled"}`,
      onClick: () => {
        if (
          isEditting &&
          isProductVariable &&
          currentStep !== ProductCreationSteps.SECOND
        ) {
          stepButtonsDispatch({ currentStep: ProductCreationSteps.SECOND });
          navigate(
            `${PRODUCTS}/${EDIT_PRODUCT}/${product?.id}/${PRODUCT_STOCKS}`
          );
        }
      },
    },
    {
      className: "step",
      title: "Specifications",
      onClick: () => {
        if (isEditting && currentStep !== ProductCreationSteps.THIRD) {
          stepButtonsDispatch({ currentStep: ProductCreationSteps.THIRD });
          navigate(
            `${PRODUCTS}/${EDIT_PRODUCT}/${product?.id}/${PRODUCT_FINISH}`
          );
        }
      },
    },
  ];

  return { stepsItems, stepperState };
};
