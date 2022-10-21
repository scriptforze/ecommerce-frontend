export interface PushNotificationProps {
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
}
