import { useParams } from "react-router-dom";
import { NotFound } from "@/modules/common/components";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { useGetStateByIdQuery } from "@/services/states";
import { useLangTranslation } from "@/modules/common/hooks";
import { StateForm } from "../../components/StateForm";

export const EditStatePage = () => {
  const { translate } = useLangTranslation();
  const { id } = useParams<{ id: string }>();
  const stateId = parseInt(id!, 10);
  const {
    data: state,
    isError: isStateError,
    isFetching: isStateLoading,
  } = useGetStateByIdQuery({ state: stateId, include: "country" });

  if (isStateLoading) return <>{`${translate("common.loading")}...`}</>;
  if (isStateError) return <NotFound />;

  return (
    <>
      <PageHeader title={translate("zones.form.title.editState")} />
      <StateForm state={state?.data} />
    </>
  );
};
