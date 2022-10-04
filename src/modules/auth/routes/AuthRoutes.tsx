import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { LoginPage, RegisterPage } from "../pages";
import { AuthLayout } from "../layout";
import { AuthRoutesList } from "./constants";
import { useAppSelector } from "@/modules/common/hooks";
import { AuthStatuses } from "../store";

export const AuthRoutes = () => {
  const { status } = useAppSelector((state) => state.auth);

  if (status === AuthStatuses.authenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AuthLayout />}>
        <Route path={AuthRoutesList.LOGIN} element={<LoginPage />} />
        <Route path={AuthRoutesList.REGISTER} element={<RegisterPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
