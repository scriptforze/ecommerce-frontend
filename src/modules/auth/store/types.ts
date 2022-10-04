import { User } from "@/services/auth";

export enum AuthStatuses {
  notAuthenticated = "not-authenticated",
  authenticated = "authenticated",
}

export interface InitialAuthState {
  status?: AuthStatuses;
  user: User | null;
  token: string | null;
}
