import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListCitiesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";

export const CitiesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListCitiesPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
