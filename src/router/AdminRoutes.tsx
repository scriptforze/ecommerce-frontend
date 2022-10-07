import { Route } from "react-router-dom";
import {
  DashboardRoutes,
  DashboardRoutesList,
} from "@/modules/dashboard/routes";
import { ProductsRoutes } from "@/modules/products/routes/ProductsRoutes";
import { AdminLayout } from "@/modules/common/layout";
import { RoutesWithNotFound } from "@/modules/common/components";

export const AdminRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AdminLayout />}>
        <Route
          path={`${DashboardRoutesList.DASHBOARD}/*`}
          element={<DashboardRoutes />}
        />
        <Route path="/products/*" element={<ProductsRoutes />} />
      </Route>
    </RoutesWithNotFound>
  );
};
