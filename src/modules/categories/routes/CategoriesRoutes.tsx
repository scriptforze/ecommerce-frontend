import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { CreateCategoryPage, ListCategoriesPage } from "../pages";
import { CategoriesRoutesList } from "./constants";
import { AuthGuard } from "@/modules/common/guards";

export const CategoriesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListCategoriesPage />} />
        <Route
          path={CategoriesRoutesList.CREATE_CATEGORY}
          element={<CreateCategoryPage />}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
