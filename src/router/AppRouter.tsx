import { Navigate, Route } from "react-router-dom";
import { AuthRoutes, AuthRoutesList } from "@/modules/auth";
import { RoutesWithNotFound } from "@/modules/common/components";
import { AdminRoutes } from "@/router/AdminRoutes";
import { DashboardRoutesList } from "@/modules/dashboard/routes";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path={`${AuthRoutesList.AUTH}/*`} element={<AuthRoutes />} />
      <Route
        path="/"
        element={<Navigate to={DashboardRoutesList.DASHBOARD} />}
      />
      <Route path="/*" element={<AdminRoutes />} />
    </RoutesWithNotFound>
  );
};
