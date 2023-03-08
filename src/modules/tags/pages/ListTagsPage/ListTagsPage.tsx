import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Table,
  TablePaginationConfig,
  Typography,
} from "antd";
import { useState } from "react";
import { SorterResult, FilterValue } from "antd/lib/table/interface";
import { Link } from "react-router-dom";
import { INITIAL_TAGS_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { TagsRoutesList, TagTableColums } from "@/modules/tags";
import {
  DeleteTagApiResponse,
  Tag,
  useDeleteTagMutation,
  useGetAllTagsQuery,
} from "@/services/tags";
import { pushNotification } from "@/modules/common/helpers";
import { GeneralStatuses } from "@/modules/common/constants";
import { useLangTranslation } from "@/modules/common/hooks/useLangTranslation";

export const ListTagsPage = () => {
  const { Title } = Typography;
  const { translate, lang } = useLangTranslation();
  document.title = "Ecommerce - Tags";

  const [tagsApiArgs, setTagsApiArgs] = useState(INITIAL_TAGS_API_ARG);

  const debouncedSearchQuery = useDebounce<string | undefined>(
    tagsApiArgs.search,
    500
  );

  const [deleteTag, { isLoading: isDeleteTagLoading }] = useDeleteTagMutation();
  const { data: getAllTagsData, isFetching } = useGetAllTagsQuery({
    lang,
    ...tagsApiArgs,
    search: debouncedSearchQuery,
  });

  const onSuccessDelete = ({ data }: DeleteTagApiResponse) => {
    const deletedTitle = translate("tags.list.messages.success.delete.title");
    const deletedMessage = translate("tags.list.messages.success.delete.msg");
    const restoredTitle = translate("tags.list.messages.success.restore.title");
    const restoredMessage = translate("tags.list.messages.success.restore.msg");

    const title =
      data?.status?.name === GeneralStatuses.ENABLED
        ? restoredTitle
        : deletedTitle;

    const message =
      data?.status?.name === GeneralStatuses.ENABLED
        ? restoredMessage
        : deletedMessage;

    pushNotification({ type: "success", title, message });
  };

  const handleDelete = (recordId: number) => {
    deleteTag({ tag: recordId, include: "status" })
      .unwrap()
      .then(onSuccessDelete);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<Tag> | SorterResult<Tag>[]
  ) => {
    const { column } = sorter as SorterResult<Tag>;

    setTagsApiArgs({
      ...tagsApiArgs,
      page: pagination.current,
      perPage: pagination.pageSize,
      sortBy: column?.key as string,
    });
  };

  const TagsColumns = TagTableColums({ handleDelete, isDeleteTagLoading });

  return (
    <>
      <Title level={1}>{translate("tags.list.title")}</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              autoComplete="off"
              placeholder={translate("tags.list.search")}
              onChange={(e) =>
                setTagsApiArgs({
                  ...tagsApiArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Link to={TagsRoutesList.CREATE_TAGS}>
              <Button
                shape="round"
                size="middle"
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right" }}
              >
                {translate("tags.list.create")}
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          columns={TagsColumns}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          dataSource={getAllTagsData?.data}
          pagination={{
            current: tagsApiArgs.page,
            pageSize: tagsApiArgs.perPage,
            total: getAllTagsData?.meta?.total,
          }}
        />
      </Card>
    </>
  );
};
