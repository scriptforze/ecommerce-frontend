import { Route } from "react-router-dom";
import { AuthRoutes, AuthRoutesList } from "@/modules/auth";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ProductsRoutes } from "@/modules/products/routes/ProductsRoutes";
import {
  DashboardRoutes,
  DashboardRoutesList,
} from "@/modules/dashboard/routes";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route
        path={`${DashboardRoutesList.DASHBOARD}/*`}
        element={<DashboardRoutes />}
      />
      <Route path={`${AuthRoutesList.AUTH}/*`} element={<AuthRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
    </RoutesWithNotFound>
  );
};
