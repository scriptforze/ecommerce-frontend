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
import { INITIAL_PRODUCT_ATTRIBUTES_API_ARG } from "./constants";
import { useDebounce } from "@/modules/common/hooks";
import { ProductAttributesTableColums } from "@/modules/product-attributes";
import {
  DeleteProductAttributeApiResponse,
  ProductAttribute,
  useDeleteProductAttributeMutation,
  useGetAllProductAttributesQuery,
} from "@/services/productAttributes";
import { pushNotification } from "@/modules/common/helpers";
import { GeneralStatuses } from "@/modules/common/constants";

const { Title } = Typography;

export const ListProductAttributesPage = () => {
  document.title = "Ecommerce - Atributos del producto";

  const [productAttributesApiArgs, setProductAttributesApiArgs] = useState(
    INITIAL_PRODUCT_ATTRIBUTES_API_ARG
  );

  const debouncedSearchQuery = useDebounce<string | undefined>(
    productAttributesApiArgs.search,
    500
  );

  const [
    deleteProductAttribute,
    { isLoading: isProductAttributeDeleteLoading },
  ] = useDeleteProductAttributeMutation();
  const { data: getAllProductAttributesData, isFetching } =
    useGetAllProductAttributesQuery({
      ...productAttributesApiArgs,
      search: debouncedSearchQuery,
    });

  const onDeleteSuccess = ({ data }: DeleteProductAttributeApiResponse) => {
    pushNotification({
      type: "success",
      title: `Product Attribute ${data?.status?.name === GeneralStatuses.DISABLED ? "deleted" : "restored"
        }`,
      message: `Product Attribute ${data?.status?.name === GeneralStatuses.DISABLED ? "deleted" : "restored"
        } successfully`,
    });
  };

  const handleDelete = (recordId: number) => {
    deleteProductAttribute({ productAttribute: recordId, include: "status" })
      .unwrap()
      .then(onDeleteSuccess);
  };

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

  const ProductAttributesColumns = ProductAttributesTableColums({
    handleDelete,
    isProductAttributeDeleteLoading,
  });

  return (
    <>
      <Title level={1}>Atributos del producto</Title>
      <Card style={{ background: "#fff" }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Input
              id="search"
              placeholder="Buscar"
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
            <Link to="create">
              <Button
                size="middle"
                shape="round"
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right" }}
              >
                Nuevo atributo del producto
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          loading={isFetching}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          columns={ProductAttributesColumns}
          dataSource={getAllProductAttributesData?.data}
          pagination={{
            current: productAttributesApiArgs.page,
            pageSize: productAttributesApiArgs.perPage,
            total: getAllProductAttributesData?.meta?.total,
          }}
        />
      </Card>
    </>
  );
};
