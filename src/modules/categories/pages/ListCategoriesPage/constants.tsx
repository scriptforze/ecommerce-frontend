import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { GetAllCategoriesApiArg, Category } from "@/services/categories";

export const INITIAL_CATEGORIES_API_ARG: GetAllCategoriesApiArg = {
  page: 1,
  perPage: 15,
};

export const columns: ColumnsType<Category> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Acciones",
    key: "actions",
    render: () => (
      <>
        <Button type="link" icon={<EditOutlined />} size="large" />
        <Button type="link" icon={<DeleteOutlined />} size="large" danger />
      </>
    ),
  },
];
