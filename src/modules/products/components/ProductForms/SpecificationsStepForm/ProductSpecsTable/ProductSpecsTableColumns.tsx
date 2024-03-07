import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTheme } from "styled-components";
import { GeneralStatuses } from "@/modules/common/constants";
import { useLangTranslation } from "@/modules/common/hooks";
import { DataColumns, ProductSpecificationsColumnsProps } from "./types";

export const ProductSpecsTableColumns = ({
  handleDelete,
}: ProductSpecificationsColumnsProps) => {
  const { translate } = useLangTranslation();
  const theme = useTheme();
  const DEFAULT_COLUMS: DataColumns = [
    {
      key: "name",
      editable: true,
      dataIndex: "name",
      title: translate("common.columns.specificationName"),
    },
    {
      key: "value",
      editable: true,
      dataIndex: "value",
      title: translate("common.columns.specificationValue"),
    },
    {
      key: "actions",
      title: translate("common.columns.actions"),
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
