import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTheme } from "styled-components";
import { GeneralStatuses } from "@/modules/common/constants";
import { DataColumns, ProductAttributeOptionsColumnsProps } from "./types";

export const ProductAttributeOptionsColumns = ({
  handleDelete,
}: ProductAttributeOptionsColumnsProps) => {
  const theme = useTheme();
  const DEFAULT_COLUMS: DataColumns = [
    {
      key: "name",
      editable: true,
      dataIndex: "name",
      title: "Option Name",
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        const IconStatus =
          record.status?.name === GeneralStatuses.ENABLED ? (
            <DeleteOutlined />
          ) : (
            <UndoOutlined style={{ color: theme.token?.colorPrimary }} />
          );
        return (
          <Button
            danger
            type="link"
            size="large"
            icon={IconStatus}
            onClick={() => handleDelete(record)}
          />
        );
      },
    },
  ];

  return DEFAULT_COLUMS;
};
