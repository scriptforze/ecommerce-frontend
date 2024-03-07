import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useLangTranslation } from "@/modules/common/hooks";
import { DeleteRestoreButton } from "@/modules/common/components";
import { UsersRoutesList } from "../../routes/constants";
import { UsersTableColumnsProps } from "./types";
import { User } from "@/services/users";

export const UsersTableColumns = ({
  handleDelete,
  isDeleteUserLoading,
}: UsersTableColumnsProps) => {
  const { translate } = useLangTranslation();
  const DEFAULT_COLUMNS: ColumnsType<User> = [
    {
      key: "id",
      width: "10%",
      sorter: true,
      dataIndex: "id",
      title: "ID",
      sortDirections: ["ascend"],
    },
    {
      key: "name",
      sorter: true,
      dataIndex: "name",
      title: translate("common.columns.name"),
      sortDirections: ["ascend"],
    },
    {
      key: "username",
      sorter: true,
      dataIndex: "username",
      title: translate("common.columns.username"),
      sortDirections: ["ascend"],
    },
    {
      key: "status",
      dataIndex: "status",
      title: translate("common.columns.status"),
      render: (_, record) => <span>{record.status?.name}</span>,
    },
    {
      width: "15%",
      key: "actions",
      title: translate("common.columns.actions"),
      render: (_, record) => (
        <>
          <Link to={`${record.id}/${UsersRoutesList.EDIT_USERS}`}>
            <Button type="link" icon={<EditOutlined />} size="large" />
          </Link>
          <DeleteRestoreButton
            recordId={record.id}
            status={record.status!}
            handleDelete={handleDelete}
            loading={isDeleteUserLoading}
          />
        </>
      ),
    },
  ];

  return DEFAULT_COLUMNS;
};
