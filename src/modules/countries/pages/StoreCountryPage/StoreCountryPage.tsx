import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useLangTranslation } from "@/modules/common/hooks";
import { CountryForm } from "../../components/CountryForm";

export const StoreCountryPage = () => {
  const { translate } = useLangTranslation();
  return (
    <>
      <PageHeader title={translate("zones.form.title.createCountry")} />
      <CountryForm />
    </>
  );
};
