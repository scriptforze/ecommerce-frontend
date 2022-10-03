import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import AdminLayout from "@/modules/common/layout/AdminLayout";
import { CreateProduct } from "../pages/CreateProduct";

export const ProductsRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AdminLayout />}>
        <Route path="create" element={<CreateProduct />} />
      </Route>
    </RoutesWithNotFound>
  );
};
