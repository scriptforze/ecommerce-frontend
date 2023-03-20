import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ProductsRoutesList } from "@/modules/products/routes";
import { Product } from "@/services/products";
import { ProductTableColumnsProps } from "./types";
import { DeleteRestoreButton } from "@/modules/common/components";
import { GeneralStatuses } from "@/modules/common/constants";
import { PublishProductButton } from "./PublishProductButton";

export const ProductTableColumns = ({
  handleDelete,
  handlePublish,
  isProductDeleteLoading,
  isProductPublishLoading,
}: ProductTableColumnsProps) => {
  const DEFAULT_COLUMNS: ColumnsType<Product> = [
    {
      key: "sku",
      title: "SKU",
      width: "10%",
      sorter: true,
      dataIndex: "sku",
      sortDirections: ["ascend"],
    },
    {
      key: "name",
      sorter: true,
      title: "Nombre",
      dataIndex: "name",
      sortDirections: ["ascend"],
    },
    {
      sorter: true,
      key: "category",
      title: "Category",
      dataIndex: "category",
      sortDirections: ["ascend"],
      render: (_, record) => <span>{record.category?.name}</span>,
    },
    {
      sorter: true,
      key: "price",
      title: "Price",
      dataIndex: "price",
      sortDirections: ["ascend"],
      render: (_, record) => (
        <span>{record.is_variable ? "Variable" : `$ ${record.price}`}</span>
      ),
    },
    {
      sorter: true,
      key: "stock",
      title: "Stock",
      dataIndex: "product_stocks",
      sortDirections: ["ascend"],
      render: (_, { is_variable, product_stocks }) => {
        const [stockObj] = product_stocks || [];
        const { stock = "-" } = stockObj || {};
        return <span>{is_variable ? "Variable" : stock}</span>;
      },
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, record) => <span>{record.status?.name}</span>,
    },
    {
      title: "Acciones",
      key: "actions",
      width: "15%",
      render: (_, record) => {
        return (
          <>
            <Link to={`${ProductsRoutesList.EDIT_PRODUCT}/${record.id}`}>
              <Button type="link" icon={<EditOutlined />} size="large" />
            </Link>
            {![GeneralStatuses.DISABLED, GeneralStatuses.ENABLED].includes(
              record.status!.name
            ) && (
              <PublishProductButton
                recordId={record.id}
                handlePublish={handlePublish}
                loading={isProductPublishLoading}
              />
            )}
            {[GeneralStatuses.DISABLED, GeneralStatuses.ENABLED].includes(
              record.status!.name
            ) && (
              <DeleteRestoreButton
                recordId={record.id}
                status={record.status!}
                handleDelete={handleDelete}
                loading={isProductDeleteLoading}
              />
            )}
          </>
        );
      },
    },
  ];

  return DEFAULT_COLUMNS;
};
