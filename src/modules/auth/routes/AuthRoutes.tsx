import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/utils/RoutesWithNotFound";
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </RoutesWithNotFound>
  );
};
