import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { CreateProduct, ProductsList } from "../pages";
import {
  GeneralStepForm,
  ShipmentStepForm,
  StocksStepForm,
} from "../components";
import { ProductsRoutesList } from "./constants";
import { AuthGuard } from "@/modules/common/guards";

export const ProductsRoutes = () => {
  const {
    CREATE_PRODUCT_GENERAL,
    CREATE_PRODUCT_STOCKS,
    CREATE_PRODUCT_FINISH,
  } = ProductsRoutesList;

  const RedirectToGeneralCreationStep = (
    <Navigate to={CREATE_PRODUCT_GENERAL} />
  );

  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<ProductsList />} />
        <Route path="/create/*" element={<CreateProduct />}>
          <Route index element={RedirectToGeneralCreationStep} />
          <Route path={CREATE_PRODUCT_STOCKS} element={<StocksStepForm />} />
          <Route path={CREATE_PRODUCT_GENERAL} element={<GeneralStepForm />} />
          <Route path={CREATE_PRODUCT_FINISH} element={<ShipmentStepForm />} />
        </Route>
      </Route>
    </RoutesWithNotFound>
  );
};
