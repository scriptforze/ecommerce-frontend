import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { CreateProduct } from "../pages/CreateProduct";

export const ProductsRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route index element={<CreateProduct />} />
    </RoutesWithNotFound>
  );
};
