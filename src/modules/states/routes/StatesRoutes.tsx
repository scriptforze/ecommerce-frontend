import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListStatesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";

export const StatesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListStatesPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
