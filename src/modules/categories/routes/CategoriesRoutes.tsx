import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { CreateCategoryPage, ListCategoriesPage } from "../pages";
import { CategoriesRoutesList } from "./constants";

export const CategoriesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route index element={<ListCategoriesPage />} />
    </RoutesWithNotFound>
  );
};
