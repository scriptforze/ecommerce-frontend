import { InitialAuthState, AuthStatuses } from "./types";

export const initialAuthState: InitialAuthState = {
  status: AuthStatuses.notAuthenticated,
  token: null,
  errorMessage: null,
};
