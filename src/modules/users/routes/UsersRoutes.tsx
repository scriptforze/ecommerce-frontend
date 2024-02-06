import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { AuthGuard } from "@/modules/common/guards";
import { UsersRoutesList } from "./constants";
import {
  EditUsersPage,
  ListUsersPage,
  StoreUsersPage,
} from "@/modules/users/pages";

export const UsersRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListUsersPage />} />
        <Route
          element={<StoreUsersPage />}
          path={UsersRoutesList.CREATE_USER}
        />
        <Route
          element={<EditUsersPage />}
          path={`${UsersRoutesList.PARAM_USERS_ID}/${UsersRoutesList.EDIT_USERS}`}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
