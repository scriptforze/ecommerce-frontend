import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { DashboardPage } from "../pages";
import { DashboardRoutesList } from "./constants";
import AdminLayout from "@/modules/common/layout/AdminLayout";

export const DashboardRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AdminLayout />}>
        <Route
          path={DashboardRoutesList.DASHBOARD}
          element={<DashboardPage />}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
