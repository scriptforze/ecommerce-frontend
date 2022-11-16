import { GetAllCountriesApiArg } from "@/services/countries";

export const INITIAL_COUNTRIES_API_ARG: GetAllCountriesApiArg = {
  include: "status",
  page: 1,
  perPage: 15,
};
