import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { State } from "@/services/states";
import { StatesRoutesList } from "../../routes";
import { StateTableColumnsProps } from "./types";
import { useLangTranslation } from "@/modules/common/hooks";
import { DeleteRestoreButton } from "@/modules/common/components";

export const StateTableColumns = ({
  handleDelete,
  isDeleteStateLoading,
}: StateTableColumnsProps) => {
  const { translate } = useLangTranslation();
  const DEFAULT_COLUMNS: ColumnsType<State> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      sorter: true,
      sortDirections: ["ascend"],
    },
    {
      title: translate("common.columns.name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortDirections: ["ascend"],
    },
    {
      title: translate("common.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (_, record) => <span>{record.status?.name}</span>,
    },
    {
      title: translate("common.columns.actions"),
      key: "actions",
      width: "15%",
      render: (_, record) => {
        return (
          <>
            <Link to={`${record.id}/${StatesRoutesList.EDIT_STATE}`}>
              <Button type="link" icon={<EditOutlined />} size="large" />
            </Link>
            <DeleteRestoreButton
              recordId={record.id}
              status={record.status!}
              handleDelete={handleDelete}
              loading={isDeleteStateLoading}
            />
          </>
        );
      },
    },
  ];

  return DEFAULT_COLUMNS;
};
