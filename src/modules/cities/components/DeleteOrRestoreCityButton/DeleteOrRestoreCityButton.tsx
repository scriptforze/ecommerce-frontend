import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";
import { useDeleteCityMutation } from "@/services/cities";
import { DeleteOrRestoreCityButtonType } from "./types";
import { GeneralStatuses } from "@/modules/common/constants";
import { pushNotification } from "@/modules/common/helpers";

export const DeleteOrRestoreCityButton = ({
  city,
}: DeleteOrRestoreCityButtonType) => {
  const [deleteCity, { data: deleteCityData, isSuccess, isLoading }] =
    useDeleteCityMutation();

  useEffect(() => {
    if (isSuccess) {
      const statusName = deleteCityData?.data?.status?.name;
      const state =
        statusName === GeneralStatuses.ENABLED ? "restored" : "removed";

      pushNotification({
        type: "success",
        title: `City ${state}`,
        message: `City was ${state} successfully.`,
      });
    }
  }, [isSuccess]);

  const ondeleteCity = () => {
    deleteCity({ city: city.id, include: "status" });
  };

  if (city.status?.name === GeneralStatuses.DISABLED) {
    return (
      <Button
        type="link"
        icon={<UndoOutlined />}
        size="large"
        onClick={ondeleteCity}
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
      onClick={ondeleteCity}
      loading={isLoading}
    />
  );
};
