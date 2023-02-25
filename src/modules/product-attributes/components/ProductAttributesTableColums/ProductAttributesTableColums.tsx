import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { ProductAttribute } from "@/services/productAttributes";

export const ProductAttributesTableColums: ColumnsType<ProductAttribute> = [
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
    render: (_, record) => (
      <>
        <Link to={`edit/${record.id}`}>
          <Button type="link" icon={<EditOutlined />} size="large" />
        </Link>
        <Button type="link" icon={<DeleteOutlined />} size="large" danger />
      </>
    ),
  },
];
