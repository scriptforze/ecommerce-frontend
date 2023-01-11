import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DeleteOrRestoreCityButton } from "../DeleteOrRestoreCityButton";
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
    title: "Name",
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
    title: "Actions",
    key: "actions",
    width: "15%",
    render: (_, record) => (
      <>
        <Button type="link" icon={<EditOutlined />} size="large" />
        <DeleteOrRestoreCityButton city={record} />
      </>
    ),
  },
];
