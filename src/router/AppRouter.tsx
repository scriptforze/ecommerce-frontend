import { Route } from "react-router-dom";
import { AuthRoutes } from "@/modules/auth/routes/AuthRoutes";
import { RoutesWithNotFound } from "@/modules/common/utils/RoutesWithNotFound";
import { ProductsRoutes } from "@/modules/products/routes/ProductsRoutes";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
    </RoutesWithNotFound>
  );
};
