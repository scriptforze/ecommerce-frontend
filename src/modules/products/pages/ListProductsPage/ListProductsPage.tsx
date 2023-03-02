import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Table,
  TablePaginationConfig,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useGetAllProductsQuery } from "@/services/productAttributeOptions";
import { INITIAL_PRODUCTS_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { ProductTableColums } from "../../components/ProductTableColumns";
import { Product } from "@/services/products";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { ProductsRoutesList } from "@/modules/products/routes";

export const ListProductPage = () => {
  const [productsArgs, setProductsArgs] = useState(INITIAL_PRODUCTS_API_ARG);
  const debouncedSearchQuery = useDebounce<string | undefined>(
    productsArgs.search,
    500
  );
  const { data: products, isFetching } = useGetAllProductsQuery({
    ...productsArgs,
    search: debouncedSearchQuery,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<Product> | SorterResult<Product>[]
  ) => {
    const { column } = sorter as SorterResult<Product>;

    setProductsArgs({
      ...productsArgs,
      page: pagination.current,
      sortBy: column?.key as string,
    });
  };

  return (
    <>
      <PageHeader title="Products" />
      <Card>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              autoComplete="off"
              placeholder="Search"
              onChange={(e) =>
                setProductsArgs({
                  ...productsArgs,
                  page: 1,
                  search: e.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Link to={ProductsRoutesList.CREATE_PRODUCT}>
              <Button
                shape="round"
                size="middle"
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right" }}
              >
                Nuevo producto
              </Button>
            </Link>
          </Col>
        </Row>
        <Table
          loading={isFetching}
          dataSource={products?.data}
          columns={ProductTableColums}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          pagination={{
            current: productsArgs.page,
            total: products?.meta?.total,
            pageSize: productsArgs.perPage,
          }}
        />
      </Card>
    </>
  );
};
