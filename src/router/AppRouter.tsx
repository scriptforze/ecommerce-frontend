import { Navigate, Route } from "react-router-dom";
import { AuthRoutes, AuthRoutesList } from "@/modules/auth";
import { RoutesWithNotFound } from "@/modules/common/components";
import {
  DashboardRoutes,
  DashboardRoutesList,
} from "@/modules/dashboard/routes";
import { ProductsRoutes } from "@/modules/products/routes/ProductsRoutes";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path={`${AuthRoutesList.AUTH}/*`} element={<AuthRoutes />} />
      <Route
        path="/"
        element={<Navigate to={`${DashboardRoutesList.DASHBOARD}`} />}
      />
      <Route
        path={`${DashboardRoutesList.DASHBOARD}/*`}
        element={<DashboardRoutes />}
      />
      <Route path="/products/*" element={<ProductsRoutes />} />
    </RoutesWithNotFound>
  );
};
