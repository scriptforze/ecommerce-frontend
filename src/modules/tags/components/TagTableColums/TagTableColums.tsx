import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Tag } from "@/services/tags";

export const TagTableColums: ColumnsType<Tag> = [
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
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
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
