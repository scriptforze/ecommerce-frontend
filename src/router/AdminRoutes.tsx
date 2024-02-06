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
} from "@/modules/product-attributes";
import { UsersRoutesList } from "@/modules/users/routes/constants";
import { UsersRoutes } from "@/modules/users";
import { ProductsRoutesList } from "@/modules/products";

export const AdminRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AdminLayout />}>
        <Route
          element={<DashboardRoutes />}
          path={`${DashboardRoutesList.DASHBOARD}/*`}
        />
        <Route
          element={<ProductsRoutes />}
          path={`${ProductsRoutesList.PRODUCTS}/*`}
        />
        <Route
          element={<ProductAttributesRoutes />}
          path={`${ProductAttributesRoutesList.PRODUCT_ATTRIBUTES}/*`}
        />
        <Route
          element={<CategoriesRoutes />}
          path={`${CategoriesRoutesList.CATEGORIES}/*`}
        />
        <Route path={`${TagsRoutesList.TAGS}/*`} element={<TagsRoutes />} />
        <Route
          element={<CountriesRoutes />}
          path={`${CountriesRoutesList.COUNTRIES}/*`}
        />
        <Route
          element={<StatesRoutes />}
          path={`${StatesRoutesList.STATES}/*`}
        />
        <Route
          element={<CitiesRoutes />}
          path={`${CitiesRoutesList.CITIES}/*`}
        />
        <Route path={`${UsersRoutesList.USERS}/*`} element={<UsersRoutes />} />
      </Route>
    </RoutesWithNotFound>
  );
};
