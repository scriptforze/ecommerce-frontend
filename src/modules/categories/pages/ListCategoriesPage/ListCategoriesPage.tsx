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
import {
  Category,
  DeleteCategoryApiResponse,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/services/categories";
import { INITIAL_CATEGORIES_API_ARG } from "./constants";
import { useDebounce, useLangTranslation } from "@/modules/common/hooks";
import {
  CategoriesRoutesList,
  CategoryTableColumns,
} from "@/modules/categories";
import { pushNotification } from "@/modules/common/helpers";
import { GeneralStatuses } from "@/modules/common/constants";

const { Title } = Typography;

export const ListCategoriesPage = () => {
  document.title = "Ecommerce - Categories";
  const { translate } = useLangTranslation();
  const [categoriesApiArgs, setCategoriesApiArgs] = useState(
    INITIAL_CATEGORIES_API_ARG
  );

  const debouncedSearchQuery = useDebounce<string | undefined>(
    categoriesApiArgs.search,
    500
  );

  const [deleteCategory, { isLoading: isDeleteCategoryLoading }] =
    useDeleteCategoryMutation();

  const { data: getAllCategoriesData, isFetching } = useGetAllCategoriesQuery({
    ...categoriesApiArgs,
    search: debouncedSearchQuery,
  });

  const onSuccessDelete = ({ data }: DeleteCategoryApiResponse) => {
    const deletedTitle = translate(
      "categories.list.messages.success.delete.title"
    );
    const deletedMessage = translate(
      "categories.list.messages.success.delete.msg"
    );
    const restoredTitle = translate(
      "categories.list.messages.success.restore.title"
    );
    const restoredMessage = translate(
      "categories.list.messages.success.restore.msg"
    );

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
    deleteCategory({ category: recordId, include: "status" })
      .unwrap()
      .then(onSuccessDelete);
  };

  const CategoryColumns = CategoryTableColumns({
    handleDelete,
    isDeleteCategoryLoading,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<Category> | SorterResult<Category>[]
  ) => {
    const { column } = sorter as SorterResult<Category>;

    setCategoriesApiArgs({
      ...categoriesApiArgs,
      page: pagination.current,
      sortBy: column?.key as string,
    });
  };

  return (
    <>
      <Title level={1}>{translate("categories.list.title")}</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder={translate("categories.list.search")}
              onChange={(e) =>
                setCategoriesApiArgs({
                  ...categoriesApiArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Link to={CategoriesRoutesList.CREATE_CATEGORY}>
              <Button
                style={{ float: "right" }}
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="middle"
              >
                {translate("categories.list.create")}
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          columns={CategoryColumns}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          dataSource={getAllCategoriesData?.data}
          pagination={{
            current: categoriesApiArgs.page,
            pageSize: categoriesApiArgs.perPage,
            total: getAllCategoriesData?.meta?.total,
          }}
        />
      </Card>
    </>
  );
};
