import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListCitiesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";
import { StoreCityPage } from "../pages/StoreCityPage";
import { CitiesRoutesList } from "./constants";
import { EditCityPage } from "../pages/EditCityPage";

export const CitiesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListCitiesPage />} />
        <Route
          element={<StoreCityPage />}
          path={CitiesRoutesList.CREATE_CITY}
        />
        <Route
          element={<EditCityPage />}
          path={`${CitiesRoutesList.PARAM_CITY_ID}/${CitiesRoutesList.EDIT_CITY}`}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
