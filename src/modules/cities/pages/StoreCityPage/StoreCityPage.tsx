import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { CityForm } from "../../components/CityForm";
import { useLangTranslation } from "@/modules/common/hooks";

export const StoreCityPage = () => {
  const { translate } = useLangTranslation();
  return (
    <>
      <PageHeader title={translate("zones.form.title.createCity")} />
      <CityForm />
    </>
  );
};
