export enum AuthStatuses {
  checking = "checking",
  notAuthenticated = "not-authenticated",
  authenticated = "authenticated",
}

export interface InitialAuthState {
  status: AuthStatuses;
  token?: string | null;
  errorMessage?: unknown | null;
}
