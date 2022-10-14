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
import {
  Category,
  GetAllCategoriesApiArg,
  useGetAllCategoriesQuery,
} from "@/services/categories";
import { columns, INITIAL_CATEGORIES_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";

const { Title } = Typography;

export const ListCategoriesPage = () => {
  const [categoriesApiArgs, setCategoriesApiArgs] = useState(
    INITIAL_CATEGORIES_API_ARG
  );

  const debouncedSearchQuery = useDebounce<GetAllCategoriesApiArg>(
    categoriesApiArgs,
    500
  );

  const { data: getAllCategoriesData, isFetching } =
    useGetAllCategoriesQuery(debouncedSearchQuery);

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
      <Title level={1}>Categorías</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Search"
              onChange={(e) =>
                setCategoriesApiArgs({
                  ...categoriesApiArgs,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Button
              style={{ float: "right" }}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="middle"
            >
              Nueva categoría
            </Button>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          rowKey={(record) => record.id}
          dataSource={getAllCategoriesData?.data}
          pagination={{
            current: categoriesApiArgs.page,
            pageSize: categoriesApiArgs.perPage,
            total: getAllCategoriesData?.meta?.total,
          }}
          columns={columns}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
};
