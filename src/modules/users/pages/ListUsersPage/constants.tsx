import { GetAllUserApiArg } from "@/services/users";

export const INITIAL_USERS_API_ARG: GetAllUserApiArg = {
  page: 1,
  perPage: 15,
  include: "status",
};
