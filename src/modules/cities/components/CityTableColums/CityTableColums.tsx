import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { City } from "@/services/cities";

export const CityTableColums: ColumnsType<City> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "10%",
    sorter: true,
    sortDirections: ["ascend"],
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    sorter: true,
    sortDirections: ["ascend"],
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => <span>{record.status?.name}</span>,
  },
  {
    title: "Acciones",
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
