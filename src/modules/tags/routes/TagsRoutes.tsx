import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import { ListTagsPage } from "../pages";
import { AuthGuard } from "@/modules/common/guards";

export const TagsRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListTagsPage />} />
      </Route>
    </RoutesWithNotFound>
  );
};
