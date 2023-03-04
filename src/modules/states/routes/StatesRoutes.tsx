import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListStatesPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";
import { StoreStatePage } from "../pages/StoreStatePage";
import { EditStatePage } from "../pages/EditStatePage";
import { StatesRoutesList } from "./constants";

export const StatesRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListStatesPage />} />
        <Route
          element={<StoreStatePage />}
          path={StatesRoutesList.CREATE_STATE}
        />
        <Route
          element={<EditStatePage />}
          path={`${StatesRoutesList.PARAM_STATE_ID}/${StatesRoutesList.EDIT_STATE}`}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
