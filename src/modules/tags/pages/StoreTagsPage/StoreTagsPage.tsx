import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { TagForm } from "../../components";
import { BREADCRUMB_ITEMS } from "./constants";

export const StoreTagsPage = () => {
  return (
    <>
      <PageHeader title="New tag" breadCrumbItems={BREADCRUMB_ITEMS} />
      <TagForm />
    </>
  );
};
