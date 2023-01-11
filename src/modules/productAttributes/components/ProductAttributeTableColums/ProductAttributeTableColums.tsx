import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ProductAttribute } from "@/services/productAttributes";

export const ProductAttributeTableColums: ColumnsType<ProductAttribute> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "10%",
    sorter: true,
    sortDirections: ["ascend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
    sortDirections: ["ascend"],
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => <span>{record.status?.name}</span>,
  },
  {
    title: "Actions",
    key: "actions",
    width: "15%",
    render: () => (
      <>
        <Button type="link" icon={<EditOutlined />} size="large" />
        <Button type="link" icon={<DeleteOutlined />} size="large" danger />
      </>
    ),
  },
];
