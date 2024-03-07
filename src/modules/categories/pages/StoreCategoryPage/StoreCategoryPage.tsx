import { Card } from "antd";
import { CategoryForm } from "@/modules/categories";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BREADCRUMB_ITEMS } from "./constants";
import { useLangTranslation } from "@/modules/common/hooks";

export const CreateCategoryPage = () => {
  const { translate } = useLangTranslation();
  document.title = `Ecommerce - ${translate("categories.form.title.create")}`;
  return (
    <>
      <PageHeader
        breadCrumbItems={BREADCRUMB_ITEMS}
        title={translate("categories.form.title.create")}
      />
      <Card>
        <CategoryForm />
      </Card>
    </>
  );
};
