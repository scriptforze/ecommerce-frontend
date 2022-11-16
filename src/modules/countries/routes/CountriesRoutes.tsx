import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListCountriesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";

export const CountriesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListCountriesPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
