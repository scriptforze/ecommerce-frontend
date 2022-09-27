import { Route } from "react-router-dom";
import { AuthRoutes, AuthRoutesList } from "@/modules/auth";
import { RoutesWithNotFound } from "@/modules/common/utils";
import { ProductsRoutes } from "@/modules/products/routes/ProductsRoutes";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path={`${AuthRoutesList.AUTH}/*`} element={<AuthRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
    </RoutesWithNotFound>
  );
};
