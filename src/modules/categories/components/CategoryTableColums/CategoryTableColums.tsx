import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { Category } from "@/services/categories";
import { DeleteOrRestoreCategoryButton } from "../DeleteOrRestoreCategoryButton";
import { CategoriesRoutesList } from "@/modules/categories";

export const CategoryTableColums: ColumnsType<Category> = [
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
    render: (_, record) => (
      <>
        <Link to={`${record.id}/${CategoriesRoutesList.EDIT_CATEGORY}`}>
          <Button type="link" icon={<EditOutlined />} size="large" />
        </Link>
        <DeleteOrRestoreCategoryButton category={record} />
      </>
    ),
  },
];
