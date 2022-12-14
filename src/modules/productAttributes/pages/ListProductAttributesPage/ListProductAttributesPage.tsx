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
import { INITIAL_PRODUCT_ATTRIBUTES_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { ProductAttributeTableColums } from "@/modules/productAttributes";
import {
  ProductAttribute,
  useGetAllProductAttributesQuery,
} from "@/services/productAttributes";

const { Title } = Typography;

export const ListProductAttributesPage = () => {
  document.title = "Ecommerce - Product attributes";

  const [productAttributesApiArgs, setProductAttributesApiArgs] = useState(
    INITIAL_PRODUCT_ATTRIBUTES_API_ARG
  );

  const debouncedSearchQuery = useDebounce<string | undefined>(
    productAttributesApiArgs.search,
    500
  );

  const { data: getAllProductAttributesData, isFetching } =
    useGetAllProductAttributesQuery({
      ...productAttributesApiArgs,
      search: debouncedSearchQuery,
    });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<ProductAttribute> | SorterResult<ProductAttribute>[]
  ) => {
    const { column } = sorter as SorterResult<ProductAttribute>;

    setProductAttributesApiArgs({
      ...productAttributesApiArgs,
      page: pagination.current,
      perPage: pagination.pageSize,
      sortBy: column?.key as string,
    });
  };

  return (
    <>
      <Title level={1}>Product attributes</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Search"
              onChange={(e) =>
                setProductAttributesApiArgs({
                  ...productAttributesApiArgs,
                  page: 1,
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
              New product attribute
            </Button>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          rowKey={(record) => record.id}
          dataSource={getAllProductAttributesData?.data}
          pagination={{
            current: productAttributesApiArgs.page,
            pageSize: productAttributesApiArgs.perPage,
            total: getAllProductAttributesData?.meta?.total,
          }}
          columns={ProductAttributeTableColums}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
};
