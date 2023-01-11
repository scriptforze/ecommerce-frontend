import { GetAllCitiesApiArg } from "@/services/cities";

export const INITIAL_CITIES_API_ARG: GetAllCitiesApiArg = {
  include: "status",
  page: 1,
  perPage: 15,
};
