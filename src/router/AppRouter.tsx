import { Navigate, Route } from "react-router-dom";
import { AuthRoutes, AuthRoutesList } from "@/modules/auth";
import { RoutesWithNotFound } from "@/modules/common/components";
import { AdminLayoutRoutes } from "@/modules/common/layout/AdminLayout/AdminLayoutRoutes";
import { DashboardRoutesList } from "@/modules/dashboard/routes";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path={`${AuthRoutesList.AUTH}/*`} element={<AuthRoutes />} />
      <Route
        path="/"
        element={<Navigate to={`${DashboardRoutesList.DASHBOARD}`} />}
      />
      <Route path="/*" element={<AdminLayoutRoutes />} />
    </RoutesWithNotFound>
  );
};
