import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListCountriesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";
import { CountriesRoutesList } from "./constants";
import { StoreCountryPage } from "../pages/StoreCountryPage";
import { EditCountryPage } from "../pages/EditCountryPage";

export const CountriesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListCountriesPage />} />
        <Route
          element={<StoreCountryPage />}
          path={CountriesRoutesList.CREATE_COUNTRY}
        />
        <Route
          element={<EditCountryPage />}
          path={`${CountriesRoutesList.PARAM_COUNTRY_ID}/${CountriesRoutesList.EDIT_COUNTRY}`}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
