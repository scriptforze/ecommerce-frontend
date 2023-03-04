import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { StateForm } from "../../components/StateForm";

export const StoreStatePage = () => {
  return (
    <>
      <PageHeader title="Create State" />
      <StateForm />
    </>
  );
};
