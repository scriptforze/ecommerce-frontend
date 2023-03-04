import { useParams } from "react-router-dom";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useGetCityByIdQuery } from "@/services/cities";
import { CityForm } from "../../components/CityForm";
import { NotFound } from "@/modules/common/components";

export const EditCityPage = () => {
  const { id } = useParams<{ id: string }>();
  const cityId = parseInt(id!, 10);
  const {
    data: city,
    isError: isCityError,
    isFetching: isCityLoading,
  } = useGetCityByIdQuery({
    city: cityId,
    include: "state",
  });

  if (isCityLoading) return <>loading...</>;
  if (isCityError) return <NotFound />;

  return (
    <>
      <PageHeader title="Edit City" />
      <CityForm city={city?.data} />
    </>
  );
};
