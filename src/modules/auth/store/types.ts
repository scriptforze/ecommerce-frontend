import { BadRequestException, ValidationException } from "@/services/auth";

export enum AuthStatuses {
  checking = "checking",
  notAuthenticated = "not-authenticated",
  authenticated = "authenticated",
}

export interface InitialAuthState {
  status: AuthStatuses;
  token?: string | null;
  errorMessage?: BadRequestException | ValidationException | string | null;
}
