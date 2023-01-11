import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import {
  CreateCategoryPage,
  EditCategoryPage,
  ListCategoriesPage,
  ShowCategoryPage,
} from "../pages";
import { CategoriesRoutesList } from "./constants";
import { AuthGuard } from "@/modules/common/guards";

export const CategoriesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListCategoriesPage />} />
        <Route
          path={CategoriesRoutesList.PARAM_CATEGORY_ID}
          element={<ShowCategoryPage />}
        />
        <Route
          path={CategoriesRoutesList.CREATE_CATEGORY}
          element={<CreateCategoryPage />}
        />
        <Route
          path={`${CategoriesRoutesList.PARAM_CATEGORY_ID}/${CategoriesRoutesList.EDIT_CATEGORY}`}
          element={<EditCategoryPage />}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
