import { Route } from "react-router-dom";
import { AuthRoutes } from "@/modules/auth/routes/AuthRoutes";
import { RoutesWithNotFound } from "@/modules/common/utils/RoutesWithNotFound";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/auth/*" element={<AuthRoutes />} />
    </RoutesWithNotFound>
  );
};
