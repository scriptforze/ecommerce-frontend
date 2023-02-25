import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListProductAttributesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";
import { ProductAttributesRoutesList } from "./constants";
import { EditProductAttributePage } from "../pages/EditProductAttributePage";
import { StoreProductAttributePage } from "../pages/StoreProductAttributePage";

export const ProductAttributesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListProductAttributesPage />} />
        <Route
          element={<StoreProductAttributePage />}
          path={`${ProductAttributesRoutesList.CREATE_PRODUCT_ATTRIBUTE}`}
        />
        <Route
          element={<EditProductAttributePage />}
          path={`${ProductAttributesRoutesList.EDIT_PRODUCT_ATTRIBUTE}/${ProductAttributesRoutesList.PARAM_PRODUCT_ATTRIBUTE_ID}`}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
