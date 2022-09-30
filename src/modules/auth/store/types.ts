export enum AuthStatuses {
  notAuthenticated = "not-authenticated",
  authenticated = "authenticated",
}

export interface InitialAuthState {
  status: AuthStatuses;
  token?: string | null;
}
