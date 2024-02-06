import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Roles"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllRoles: build.query<GetAllRolesApiResponse, GetAllRolesApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/roles`,
          params: {
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
            lang: queryArg.lang,
          },
        }),
        providesTags: ["Roles"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetAllRolesApiResponse = /** status 200 success */ {
  data?: Role[];
  meta?: Pagination;
};
export type GetAllRolesApiArg = {
  /** Number of resources per page */
  perPage?: number;
  /** Number of current page */
  page?: number;
  /** Name of field to sort */
  sortBy?: string;
  /** Code of language */
  lang?: string;
};
export type Permission = {
  id: number;
  name: string;
  module: string;
};
export type Role = {
  id: number;
  name: string;
  permissions?: Permission[];
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export const { useGetAllRolesQuery } = injectedRtkApi;
