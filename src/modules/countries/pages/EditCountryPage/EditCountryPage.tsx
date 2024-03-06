import { useParams } from "react-router-dom";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useGetCountryByIdQuery } from "@/services/countries";
import { CountryForm } from "../../components/CountryForm";
import { useLangTranslation } from "@/modules/common/hooks";
import { NotFound } from "@/modules/common/components";

export const EditCountryPage = () => {
  const { translate } = useLangTranslation();
  const { id } = useParams<{ id: string }>();
  const countryId = parseInt(id!, 10);

  const {
    data: country,
    isError: isCountryError,
    isFetching: isCountryLoading,
  } = useGetCountryByIdQuery({ country: countryId });

  if (isCountryLoading) return <>{`${translate("common.loading")}...`}</>;
  if (isCountryError) return <NotFound />;

  return (
    <>
      <PageHeader title={translate("categories.form.title.update")} />
      <CountryForm country={country?.data} />
    </>
  );
};
