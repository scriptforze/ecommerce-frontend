import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { DashboardPage } from "../pages";
import AdminLayout from "@/modules/common/layout/AdminLayout";
import { AuthGuard } from "@/modules/common/guards";

export const DashboardRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AdminLayout />}>
        <Route element={<AuthGuard />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Route>
    </RoutesWithNotFound>
  );
};
