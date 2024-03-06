import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { Tag } from "@/services/tags";
import { TagsRoutesList } from "../../routes";
import { DeleteRestoreButton } from "@/modules/common/components";
import { TagTableColumnsProps } from "./types";
import { useLangTranslation } from "@/modules/common/hooks";

export const TagTableColums = ({
  handleDelete,
  isDeleteTagLoading,
}: TagTableColumnsProps) => {
  const { translate } = useLangTranslation();
  const DEFAULT_COLUMNS: ColumnsType<Tag> = [
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
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
      render: (_, record) => (
        <>
          <Link to={`${record.id}/${TagsRoutesList.EDIT_TAGS}`}>
            <Button type="link" icon={<EditOutlined />} size="large" />
          </Link>
          <DeleteRestoreButton
            recordId={record.id}
            status={record.status!}
            handleDelete={handleDelete}
            loading={isDeleteTagLoading}
          />
        </>
      ),
    },
  ];

  return DEFAULT_COLUMNS;
};
