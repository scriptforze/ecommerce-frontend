import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/utils/RoutesWithNotFound";
import CreateProduct from "../pages/CreateProduct";
import AdminLayout from "@/modules/common/layout/AdminLayout";

export const ProductsRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AdminLayout />}>
        <Route path="create" element={<CreateProduct />} />
      </Route>
    </RoutesWithNotFound>
  );
};
