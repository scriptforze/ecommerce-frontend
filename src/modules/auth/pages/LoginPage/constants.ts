import { LoginAuthRequest } from "@/services/auth";
import { IAlertVisibility } from "./types";

export const LOGIN_DEFAULT: LoginAuthRequest = { username: "", password: "" };

export const ALERT_VISIBILITY_DEFAULT: IAlertVisibility = {
  isVisible: false,
  message: "",
};
