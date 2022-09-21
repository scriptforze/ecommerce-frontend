import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/utils/RoutesWithNotFound";
import { LoginPage, RegisterPage } from "../pages";
import { AuthLayout } from "../layout";

export const AuthRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
