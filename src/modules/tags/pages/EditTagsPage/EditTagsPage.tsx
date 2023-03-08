import { useParams } from "react-router-dom";
import { useGetTagByIdQuery } from "@/services/tags";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { TagsRoutesList } from "../../routes";
import { BreadCrumbItem } from "@/modules/common/components/PageHeader/types";
import { TagForm } from "../../components";
import { NotFound } from "@/modules/common/components";
import { useLangTranslation } from "@/modules/common/hooks";

export const EditTagsPage = () => {
  const { id } = useParams();
  const { translate } = useLangTranslation();
  const BREADCRUMB_ITEMS: BreadCrumbItem[] = [
    {
      title: "Tags",
      link: TagsRoutesList.TAGS,
    },
    {
      title: "New tag",
    },
  ];

  const tag = parseInt(id!, 10);

  const {
    data: tagResponse,
    isFetching,
    isError,
  } = useGetTagByIdQuery({ tag });

  if (isFetching) return <>loading...</>;
  if (isError) return <NotFound />;

  return (
    <>
      <PageHeader
        breadCrumbItems={BREADCRUMB_ITEMS}
        title={translate("tags.form.title.update")}
      />
      <TagForm tag={tagResponse?.data} />
    </>
  );
};
