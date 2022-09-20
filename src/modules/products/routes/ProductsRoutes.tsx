import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/utils/RoutesWithNotFound";
import CreateProduct from "../pages/CreateProduct";

export const ProductsRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="create" element={<CreateProduct />} />
    </RoutesWithNotFound>
  );
};
