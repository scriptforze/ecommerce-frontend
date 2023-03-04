import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { CityForm } from "../../components/CityForm";

export const StoreCityPage = () => {
  return (
    <>
      <PageHeader title="Create City" />
      <CityForm />
    </>
  );
};
