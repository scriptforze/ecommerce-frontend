import { Card } from "antd";
import { StoreCategoryForm } from "@/modules/categories";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BREADCRUMB_ITEMS } from "./constants";

export const CreateCategoryPage = () => {
  document.title = "Ecommerce - New category";
  return (
    <>
      <PageHeader title="Create category" breadCrumbItems={BREADCRUMB_ITEMS} />
      <Card>
        <StoreCategoryForm />
      </Card>
    </>
  );
};
