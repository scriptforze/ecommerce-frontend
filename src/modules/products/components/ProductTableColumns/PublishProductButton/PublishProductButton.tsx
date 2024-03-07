import { UploadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { PublishProductButtonProps } from "./types";
import { useLangTranslation } from "@/modules/common/hooks";

export const PublishProductButton = ({
  loading,
  recordId,
  handlePublish,
}: PublishProductButtonProps) => {
  const [resourceId, setResourceId] = useState<number | null>(null);
  const { translate } = useLangTranslation();

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
    <Tooltip
      title={translate("products.form.messages.success.published.bottom")}
    >
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
