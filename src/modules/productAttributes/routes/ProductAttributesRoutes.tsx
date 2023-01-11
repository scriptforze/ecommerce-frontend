import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListProductAttributesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";

export const ProductAttributesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListProductAttributesPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
