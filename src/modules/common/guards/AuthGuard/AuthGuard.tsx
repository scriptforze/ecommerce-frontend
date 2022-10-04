import { Navigate, Outlet } from "react-router-dom";
import { AuthRoutesList, AuthStatuses } from "@/modules/auth";
import { useAppSelector } from "../../hooks";

export const AuthGuard = () => {
  const { status } = useAppSelector((state) => state.auth);

  if (status === AuthStatuses.authenticated) {
    return <Outlet />;
  }

  return (
    <Navigate replace to={`/${AuthRoutesList.AUTH}/${AuthRoutesList.LOGIN}`} />
  );
};
