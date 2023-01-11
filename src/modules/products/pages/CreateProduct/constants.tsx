import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { ProductsRoutesList } from "@/modules/products/routes";
import { ButtonState, StepButtonsState } from "./types";

export const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
  {
    title: "Products",
    link: ProductsRoutesList.PRODUCTS,
  },
  {
    title: "New product",
  },
];

export const STEPS_ITEMS = [
  {
    title: "General",
  },
  {
    title: "Stocks",
  },
  {
    title: "Specifications",
  },
];

export const INITIAL_DISCARD_BUTTON_STATE: ButtonState = {
  nextStep: 0,
  title: "Discard",
  action: "discard",
  icon: <CloseOutlined />,
  className: "space-buttons__button--discard",
};

export const INITIAL_SUBMIT_BUTTON_STATE: ButtonState = {
  nextStep: 1,
  title: "Next",
  action: "next-back",
  icon: <ArrowRightOutlined />,
  className: "space-buttons__button--continue",
};

export const INITIAL_STEP_BUTTONS_STATE: StepButtonsState = {
  step: 0,
  submit: INITIAL_SUBMIT_BUTTON_STATE,
  discard: INITIAL_DISCARD_BUTTON_STATE,
};
