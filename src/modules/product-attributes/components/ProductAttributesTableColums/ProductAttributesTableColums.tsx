import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { ProductAttribute } from "@/services/productAttributes";
import { DeleteRestoreButton } from "@/modules/common/components";
import { useLangTranslation } from "@/modules/common/hooks";
import { ProductAttributesTableColumsProps } from "./types";

export const ProductAttributesTableColums = ({
  handleDelete,
  isProductAttributeDeleteLoading,
}: ProductAttributesTableColumsProps) => {
  const { translate } = useLangTranslation();
  const DEFAULT_COLUMNS: ColumnsType<ProductAttribute> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      sorter: true,
      sortDirections: ["ascend"],
    },
    {
      title: translate("common.columns.name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortDirections: ["ascend"],
    },
    {
      title: translate("common.columns.type"),
      dataIndex: "type",
      key: "type",
    },
    {
      title: translate("common.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (_, record) => <span>{record.status?.name}</span>,
    },
    {
      title: translate("common.columns.actions"),
      key: "actions",
      width: "15%",
      render: (_, record) => (
        <>
          <Link to={`edit/${record.id}`}>
            <Button type="link" icon={<EditOutlined />} size="large" />
          </Link>
          <DeleteRestoreButton
            recordId={record.id}
            status={record.status!}
            handleDelete={handleDelete}
            loading={isProductAttributeDeleteLoading}
          />
        </>
      ),
    },
  ];

  return DEFAULT_COLUMNS;
};
