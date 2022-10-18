import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useEffect } from "react";
import { useDeleteCategoryMutation } from "@/services/categories";
import { DeleteOrRestoreCategoryButtonType } from "./types";
import { GeneralStatuses } from "@/modules/common/constants";

export const DeleteOrRestoreCategoryButton = ({
  category,
}: DeleteOrRestoreCategoryButtonType) => {
  const [deleteCategory, { data: deleteCategoryData, isSuccess, isLoading }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      const statusName = deleteCategoryData?.data?.status?.name;
      const word =
        statusName === GeneralStatuses.ENABLED ? "restored" : "removed";

      notification.open({
        message: `Resource ${word}`,
        description: `category was ${word} successfully.`,
        // onClose: () => {
        //   console.log("was cosed");
        // },
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
