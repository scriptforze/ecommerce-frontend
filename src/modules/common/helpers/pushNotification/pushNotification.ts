import { notification } from "antd";
import { PushNotificationProps } from "./types";

export const pushNotification = ({
  type,
  title,
  message,
}: PushNotificationProps) => {
  if (type === "success") {
    notification.success({
      message: title,
      description: message,
    });
  }

  if (type === "error") {
    notification.error({
      message: title,
      description: message,
    });
  }

  if (type === "info") {
    notification.info({
      message: title,
      description: message,
    });
  }

  if (type === "warning") {
    notification.warning({
      message: title,
      description: message,
    });
  }
};
