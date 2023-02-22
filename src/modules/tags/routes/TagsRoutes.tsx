import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "@/modules/common/components";
import {
  EditTagsPage,
  ListTagsPage,
  StoreTagsPage,
} from "@/modules/tags/pages";
import { AuthGuard } from "@/modules/common/guards";
import { TagsRoutesList } from "./constants";

export const TagsRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route index element={<ListTagsPage />} />
        <Route path={TagsRoutesList.CREATE_TAGS} element={<StoreTagsPage />} />
        <Route
          path={`${TagsRoutesList.PARAM_TAGS_ID}/${TagsRoutesList.EDIT_TAGS}`}
          element={<EditTagsPage />}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
