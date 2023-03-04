import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { DeleteOrRestoreCityButton } from "../DeleteOrRestoreCityButton";
import { City } from "@/services/cities";
import { CitiesRoutesList } from "../../routes";

export const CityTableColums: ColumnsType<City> = [
  {
    key: "id",
    title: "ID",
    width: "10%",
    sorter: true,
    dataIndex: "id",
    sortDirections: ["ascend"],
  },
  {
    key: "name",
    sorter: true,
    title: "Name",
    dataIndex: "name",
    sortDirections: ["ascend"],
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    render: (_, record) => <span>{record.status?.name}</span>,
  },
  {
    width: "15%",
    key: "actions",
    title: "Actions",
    render: (_, record) => (
      <>
        <Link to={`${record.id}/${CitiesRoutesList.EDIT_CITY}`}>
          <Button type="link" icon={<EditOutlined />} size="large" />
        </Link>
        <DeleteOrRestoreCityButton city={record} />
      </>
    ),
  },
];
