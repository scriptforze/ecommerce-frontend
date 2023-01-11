import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";
import { useDeleteCategoryMutation } from "@/services/categories";
import { DeleteOrRestoreCategoryButtonType } from "./types";
import { GeneralStatuses } from "@/modules/common/constants";
import { pushNotification } from "@/modules/common/helpers";

export const DeleteOrRestoreCategoryButton = ({
  category,
}: DeleteOrRestoreCategoryButtonType) => {
  const [deleteCategory, { data: deleteCategoryData, isSuccess, isLoading }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      const statusName = deleteCategoryData?.data?.status?.name;
      const state =
        statusName === GeneralStatuses.ENABLED ? "restored" : "removed";

      pushNotification({
        type: "success",
        title: `Category ${state}`,
        message: `Category was ${state} successfully.`,
      });
    }
  }, [isSuccess]);

  const onDeleteCategory = () => {
    deleteCategory({ category: category.id, include: "status" });
  };

  if (category.status?.name === GeneralStatuses.DISABLED) {
    return (
      <Button
        type="link"
        icon={<UndoOutlined />}
        size="large"
        onClick={onDeleteCategory}
        loading={isLoading}
      />
    );
  }

  return (
    <Button
      type="link"
      icon={<DeleteOutlined />}
      size="large"
      danger
      onClick={onDeleteCategory}
      loading={isLoading}
    />
  );
};
