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
import { StatesRoutes, StatesRoutesList } from "@/modules/states";
import { TagsRoutes, TagsRoutesList } from "@/modules/tags";
import {
  ProductAttributesRoutes,
  ProductAttributesRoutesList,
} from "@/modules/productAttributes";

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
          path={`${ProductAttributesRoutesList.PRODUCT_ATTRIBUTES}/*`}
          element={<ProductAttributesRoutes />}
        />
        <Route
          path={`${CategoriesRoutesList.CATEGORIES}/*`}
          element={<CategoriesRoutes />}
        />
        <Route path={`${TagsRoutesList.TAGS}/*`} element={<TagsRoutes />} />
        <Route
          path={`${CountriesRoutesList.COUNTRIES}/*`}
          element={<CountriesRoutes />}
        />
        <Route
          path={`${StatesRoutesList.STATES}/*`}
          element={<StatesRoutes />}
        />
        <Route
          path={`${CitiesRoutesList.CITIES}/*`}
          element={<CitiesRoutes />}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
