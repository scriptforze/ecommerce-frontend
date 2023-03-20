import { UploadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { PublishProductButtonProps } from "./types";

export const PublishProductButton = ({
  loading,
  recordId,
  handlePublish,
}: PublishProductButtonProps) => {
  const [resourceId, setResourceId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && resourceId != null) {
      setResourceId(null);
    }
  }, [loading, resourceId]);

  const onPublish = () => {
    setResourceId(recordId);
    handlePublish(recordId);
  };

  return (
    <Tooltip title="Publish Product">
      <Button
        type="link"
        size="large"
        onClick={onPublish}
        icon={<UploadOutlined />}
        loading={resourceId === recordId && loading}
      />
    </Tooltip>
  );
};
