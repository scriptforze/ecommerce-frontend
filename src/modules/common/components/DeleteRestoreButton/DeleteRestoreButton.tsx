import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { GeneralStatuses } from "../../constants";
import { DeleteRestoreButtonProps, StatusModel } from "./types";

export const DeleteRestoreButton = <T extends StatusModel>({
  status,
  loading,
  recordId,
  handleDelete,
}: DeleteRestoreButtonProps<T>) => {
  const [resourceId, setResourceId] = useState<number | null>(null);
  const DeleteRestoreIconStatus =
    status?.name === GeneralStatuses.ENABLED ? (
      <DeleteOutlined />
    ) : (
      <UndoOutlined />
    );

  useEffect(() => {
    if (!loading && resourceId != null) {
      setResourceId(null);
    }
  }, [loading, resourceId]);

  const onDeleteRestore = () => {
    setResourceId(recordId);
    handleDelete(recordId);
  };

  return (
    <Button
      type="link"
      size="large"
      onClick={onDeleteRestore}
      icon={DeleteRestoreIconStatus}
      loading={resourceId === recordId && loading}
      danger={status?.name === GeneralStatuses.ENABLED}
    />
  );
};
