import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useLangTranslation } from "@/modules/common/hooks";
import { StateForm } from "../../components/StateForm";

export const StoreStatePage = () => {
  const { translate } = useLangTranslation();
  return (
    <>
      <PageHeader title={translate("zones.form.title.createState")} />
      <StateForm />
    </>
  );
};
