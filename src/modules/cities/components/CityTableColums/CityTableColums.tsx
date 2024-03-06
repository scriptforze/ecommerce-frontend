import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { City } from "@/services/cities";
import { CitiesRoutesList } from "../../routes";
import { CityTableColumnsProps } from "./types";
import { useLangTranslation } from "@/modules/common/hooks";
import { DeleteRestoreButton } from "@/modules/common/components";

export const CityTableColums = ({
  handleDelete,
  isDeleteCityLoading,
}: CityTableColumnsProps) => {
  const { translate } = useLangTranslation();
  const DEFAULT_COLUMNS: ColumnsType<City> = [
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
      title: translate("common.columns.name"),
      dataIndex: "name",
      sortDirections: ["ascend"],
    },
    {
      key: "status",
      title: translate("common.columns.status"),
      dataIndex: "status",
      render: (_, record) => <span>{record.status?.name}</span>,
    },
    {
      width: "15%",
      key: "actions",
      title: translate("common.columns.actions"),
      render: (_, record) => (
        <>
          <Link to={`${record.id}/${CitiesRoutesList.EDIT_CITY}`}>
            <Button type="link" icon={<EditOutlined />} size="large" />
          </Link>
          <DeleteRestoreButton
            recordId={record.id}
            status={record.status!}
            handleDelete={handleDelete}
            loading={isDeleteCityLoading}
          />
        </>
      ),
    },
  ];

  return DEFAULT_COLUMNS;
};
