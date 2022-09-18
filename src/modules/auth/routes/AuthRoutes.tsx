import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/utils/RoutesWithNotFound";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AuthRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </RoutesWithNotFound>
  );
};
