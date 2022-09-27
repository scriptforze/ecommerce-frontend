import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/utils";
import { LoginPage, RegisterPage } from "../pages";
import { AuthLayout } from "../layout";
import { AuthRoutesList } from "./constants";

export const AuthRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AuthLayout />}>
        <Route path={AuthRoutesList.LONGIN} element={<LoginPage />} />
        <Route path={AuthRoutesList.REGISTER} element={<RegisterPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
