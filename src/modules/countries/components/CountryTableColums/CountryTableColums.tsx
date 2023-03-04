import { DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { Country } from "@/services/countries";
import { CountriesRoutesList } from "../../routes";
import { CountryTableColumnsProps } from "./types";
import { GeneralStatuses } from "@/modules/common/constants";

export const CountryTableColums = ({
  handleDelete,
  isDeleteCountryLoading,
}: CountryTableColumnsProps) => {
  const DEFAULT_COLUMS: ColumnsType<Country> = [
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
      render: (_, record) => {
        const DeleteRestoreIconStatus =
          record.status?.name === GeneralStatuses.ENABLED ? (
            <DeleteOutlined />
          ) : (
            <UndoOutlined />
          );

        return (
          <>
            <Link to={`${record.id}/${CountriesRoutesList.EDIT_COUNTRY}`}>
              <Button type="link" icon={<EditOutlined />} size="large" />
            </Link>
            <Button
              type="link"
              size="large"
              icon={DeleteRestoreIconStatus}
              loading={isDeleteCountryLoading}
              onClick={() => handleDelete(record)}
              danger={record.status?.name === GeneralStatuses.ENABLED}
            />
          </>
        );
      },
    },
  ];

  return DEFAULT_COLUMS;
};
