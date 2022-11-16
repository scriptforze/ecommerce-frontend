import { GetAllTagsApiArg } from "@/services/tags";

export const INITIAL_TAGS_API_ARG: GetAllTagsApiArg = {
  include: "status",
  page: 1,
  perPage: 15,
};
