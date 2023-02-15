import { Outlet } from "react-router-dom";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BREADCRUMB_ITEMS } from "./constants";
import { CustomProductStepperProvider } from "../../components/CustomProductStepper/CustomProductStepperProvider";

export const CreateProduct = () => {
  document.title = "Ecommerce - New Product";
  return (
    <>
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <CustomProductStepperProvider>
        <Outlet />
      </CustomProductStepperProvider>
    </>
  );
};
