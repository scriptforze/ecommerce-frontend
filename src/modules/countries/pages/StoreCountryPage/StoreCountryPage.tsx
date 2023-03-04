import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { CountryForm } from "../../components/CountryForm";

export const StoreCountryPage = () => {
  return (
    <>
      <PageHeader title="Create Country" />
      <CountryForm />
    </>
  );
};
