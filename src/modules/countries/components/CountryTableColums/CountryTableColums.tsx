import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Country } from "@/services/countries";

export const CountryTableColums: ColumnsType<Country> = [
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
    title: "Short Name",
    dataIndex: "short_name",
    key: "short_name",
  },
  {
    title: "Phone Code",
    dataIndex: "phone_code",
    key: "phone_code",
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
