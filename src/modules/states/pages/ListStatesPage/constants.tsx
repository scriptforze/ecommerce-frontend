import { GetAllStatesApiArg } from "@/services/states";

export const INITIAL_STATES_API_ARG: GetAllStatesApiArg = {
  include: "status",
  page: 1,
  perPage: 15,
};
