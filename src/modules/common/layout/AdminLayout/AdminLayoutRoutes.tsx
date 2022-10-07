import { Route } from "react-router-dom";
import {
  DashboardRoutes,
  DashboardRoutesList,
} from "@/modules/dashboard/routes";
import { ProductsRoutes } from "@/modules/products/routes/ProductsRoutes";
import { AdminLayout } from "./AdminLayout";
import { RoutesWithNotFound } from "../../components";

export const AdminLayoutRoutes = () => {
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
