import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import {
  CreateProductPage,
  EditGeneralStepPage,
  EditSpecificationsStepPage,
  ListProductPage,
} from "../pages";
import { StocksStepForm } from "../components";
import { ProductsRoutesList } from "./constants";
import { AuthGuard } from "@/modules/common/guards";
import { CustomProductStepperProvider } from "../components/CustomProductStepper/CustomProductStepperProvider";
import { ProductStatusGuard } from "@/modules/products/guards";

export const ProductsRoutes = () => {
  const {
    EDIT_PRODUCT,
    PRODUCT_STOCKS,
    PRODUCT_FINISH,
    CREATE_PRODUCT,
    PRODUCT_GENERAL,
    PARAM_PRODUCT_ID,
  } = ProductsRoutesList;

  const RedirectToGeneralStep = <Navigate to={PRODUCT_GENERAL} />;

  return (
    <CustomProductStepperProvider>
      <RoutesWithNotFound>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<ListProductPage />} />

          <Route path={CREATE_PRODUCT} element={<CreateProductPage />} />

          <Route
            element={<ProductStatusGuard />}
            path={`/${EDIT_PRODUCT}/${PARAM_PRODUCT_ID}/*`}
          >
            <Route path={PRODUCT_GENERAL} element={<EditGeneralStepPage />} />
            <Route path={PRODUCT_STOCKS} element={<StocksStepForm />} />
            <Route
              path={PRODUCT_FINISH}
              element={<EditSpecificationsStepPage />}
            />
            <Route path="*" element={RedirectToGeneralStep} />
          </Route>
        </Route>
      </RoutesWithNotFound>
    </CustomProductStepperProvider>
  );
};
