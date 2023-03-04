import { useParams } from "react-router-dom";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useGetCountryByIdQuery } from "@/services/countries";
import { CountryForm } from "../../components/CountryForm";
import { NotFound } from "@/modules/common/components";

export const EditCountryPage = () => {
  const { id } = useParams<{ id: string }>();
  const countryId = parseInt(id!, 10);

  const {
    data: country,
    isError: isCountryError,
    isFetching: isCountryLoading,
  } = useGetCountryByIdQuery({ country: countryId });

  if (isCountryLoading) return <>Loading...</>;
  if (isCountryError) return <NotFound />;

  return (
    <>
      <PageHeader title="Edit Country" />
      <CountryForm country={country?.data} />
    </>
  );
};
