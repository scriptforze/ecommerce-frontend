import { Route } from "react-router-dom";
import {
  DashboardRoutes,
  DashboardRoutesList,
} from "@/modules/dashboard/routes";
import { ProductsRoutes } from "@/modules/products/routes/ProductsRoutes";
import { AdminLayout } from "@/modules/common/layout";
import { RoutesWithNotFound } from "@/modules/common/components";
import { CategoriesRoutesList, CategoriesRoutes } from "@/modules/categories";
import { CitiesRoutes, CitiesRoutesList } from "@/modules/cities";
import { CountriesRoutes, CountriesRoutesList } from "@/modules/countries";

export const AdminRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AdminLayout />}>
        <Route
          path={`${DashboardRoutesList.DASHBOARD}/*`}
          element={<DashboardRoutes />}
        />
        <Route path="/products/*" element={<ProductsRoutes />} />
        <Route
          path={`${CategoriesRoutesList.CATEGORIES}/*`}
          element={<CategoriesRoutes />}
        />
        <Route
          path={`${CountriesRoutesList.COUNTRIES}/*`}
          element={<CountriesRoutes />}
        />
        <Route
          path={`${CitiesRoutesList.CITIES}/*`}
          element={<CitiesRoutes />}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
