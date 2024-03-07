import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BREADCRUMB_ITEMS } from "./constants";
import { GeneralStepForm } from "@/modules/products/components";
import { useLangTranslation } from "@/modules/common/hooks";

export const CreateProductPage = () => {
  const { translate } = useLangTranslation();
  const pageHeaderTitle = translate("products.list.create");
  document.title = pageHeaderTitle;
  return (
    <>
      <PageHeader title={pageHeaderTitle} breadCrumbItems={BREADCRUMB_ITEMS} />
      <GeneralStepForm />
    </>
  );
};
