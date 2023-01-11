import { getLocalStorage } from "@/modules/common/helpers";
import { InitialAuthState, AuthStatuses } from "./types";

export const TOKEN_KEY = "token";

export const initialAuthState: InitialAuthState = {
  // status: AuthStatuses.notAuthenticated,
  // token: null,
  status: getLocalStorage(TOKEN_KEY)
    ? AuthStatuses.authenticated
    : AuthStatuses.notAuthenticated,
  token: getLocalStorage(TOKEN_KEY) || null,
  user: null,
};
