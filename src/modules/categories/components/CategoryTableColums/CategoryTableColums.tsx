import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { Category } from "@/services/categories";
import { CategoriesRoutesList } from "@/modules/categories";
import { CategoryTableColumnsProps } from "./type";
import { useLangTranslation } from "@/modules/common/hooks";
import { DeleteRestoreButton } from "@/modules/common/components";

export const CategoryTableColumns = ({
  handleDelete,
  isDeleteCategoryLoading,
}: CategoryTableColumnsProps) => {
  const { translate } = useLangTranslation();
  const DEFAULT_COLUMNS: ColumnsType<Category> = [
    {
      key: "id",
      width: "10%",
      sorter: true,
      dataIndex: "id",
      sortDirections: ["ascend"],
      title: translate("categories.list.columns.id"),
    },
    {
      key: "name",
      sorter: true,
      dataIndex: "name",
      sortDirections: ["ascend"],
      title: translate("categories.list.columns.name"),
    },
    {
      key: "status",
      dataIndex: "status",
      title: translate("categories.list.columns.status"),
      render: (_, record) => <span>{record.status?.name}</span>,
    },
    {
      width: "15%",
      key: "actions",
      title: translate("categories.list.columns.actions"),
      render: (_, record) => (
        <>
          <Link to={`${record.id}/${CategoriesRoutesList.EDIT_CATEGORY}`}>
            <Button type="link" icon={<EditOutlined />} size="large" />
          </Link>
          <DeleteRestoreButton
            recordId={record.id}
            status={record.status!}
            handleDelete={handleDelete}
            loading={isDeleteCategoryLoading}
          />
        </>
      ),
    },
  ];

  return DEFAULT_COLUMNS;
};
