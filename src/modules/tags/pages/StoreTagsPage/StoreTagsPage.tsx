import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useLangTranslation } from "@/modules/common/hooks";
import { TagForm } from "../../components";
import { BREADCRUMB_ITEMS } from "./constants";

export const StoreTagsPage = () => {
  const { translate } = useLangTranslation();
  return (
    <>
      <PageHeader
        breadCrumbItems={BREADCRUMB_ITEMS}
        title={translate("tags.form.title.create")}
      />
      <TagForm />
    </>
  );
};
