import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { Country } from "@/services/countries";
import { CountriesRoutesList } from "../../routes";
import { CountryTableColumnsProps } from "./types";
import { DeleteRestoreButton } from "@/modules/common/components";

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
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortDirections: ["ascend"],
    },
    {
      title: "Nombre Corto",
      dataIndex: "short_name",
      key: "short_name",
    },
    {
      title: "Código Telefónico",
      dataIndex: "phone_code",
      key: "phone_code",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <span>{record.status?.name}</span>,
    },
    {
      title: "Acciones",
      key: "actions",
      width: "15%",
      render: (_, record) => {
        return (
          <>
            <Link to={`${record.id}/${CountriesRoutesList.EDIT_COUNTRY}`}>
              <Button type="link" icon={<EditOutlined />} size="large" />
            </Link>
            <DeleteRestoreButton
              recordId={record.id}
              status={record.status!}
              handleDelete={handleDelete}
              loading={isDeleteCountryLoading}
            />
          </>
        );
      },
    },
  ];

  return DEFAULT_COLUMS;
};
