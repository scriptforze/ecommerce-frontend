import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BREADCRUMB_ITEMS } from "./constants";
import { GeneralStepForm } from "@/modules/products/components";

export const CreateProductPage = () => {
  document.title = "Ecommerce - New Product";
  return (
    <>
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <GeneralStepForm />
    </>
  );
};
