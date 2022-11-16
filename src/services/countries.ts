import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Countries"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCountryById: build.query<
        GetCountryByIdApiResponse,
        GetCountryByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/countries/${queryArg.country}`,
          params: { include: queryArg.include },
        }),
        providesTags: ["Countries"],
      }),
      updateCountry: build.mutation<
        UpdateCountryApiResponse,
        UpdateCountryApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/countries/${queryArg.country}`,
          method: "PUT",
          body: queryArg.updateCountryRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Countries"],
      }),
      deleteCountry: build.mutation<
        DeleteCountryApiResponse,
        DeleteCountryApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/countries/${queryArg.country}`,
          method: "DELETE",
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Countries"],
      }),
      getAllCountries: build.query<
        GetAllCountriesApiResponse,
        GetAllCountriesApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/countries`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
          },
        }),
        providesTags: ["Countries"],
      }),
      saveCountry: build.mutation<SaveCountryApiResponse, SaveCountryApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/countries`,
          method: "POST",
          body: queryArg.storeCountryRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Countries"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetCountryByIdApiResponse = /** status 200 success */ {
  data?: Country;
};
export type GetCountryByIdApiArg = {
  /** Id of country */
  country: number;
  /** Relationships of resource */
  include?: string;
};
export type UpdateCountryApiResponse = /** status 200 success */ {
  data?: Country;
};
export type UpdateCountryApiArg = {
  /** Id of country */
  country: number;
  /** Relationships of resource */
  include?: string;
  updateCountryRequest: UpdateCountryRequest;
};
export type DeleteCountryApiResponse = /** status 200 success */ {
  data?: Country;
};
export type DeleteCountryApiArg = {
  /** Id of country */
  country: number;
  /** Relationships of resource */
  include?: string;
};
export type GetAllCountriesApiResponse = /** status 200 success */ {
  data?: Country[];
  meta?: Pagination;
};
export type GetAllCountriesApiArg = {
  /** Relationships of resource */
  include?: string;
  /** String to search */
  search?: string;
  /** Number of resources per page */
  perPage?: number;
  /** Number of current page */
  page?: number;
  /** Name of field to sort */
  sortBy?: string;
};
export type SaveCountryApiResponse = /** status 200 success */ {
  data?: Country;
};
export type SaveCountryApiArg = {
  /** Relationships of resource */
  include?: string;
  storeCountryRequest: StoreCountryRequest;
};
export type Status = {
  id: number;
  name: string;
  type: string;
};
export type Country = {
  id: number;
  name: string;
  short_name: string;
  phone_code: string;
  status?: Status;
};
export type ModelNotFoundException = {
  error?: string;
  code?: number;
};
export type BadRequestException = {
  error?: string;
  code?: number;
};
export type AuthenticationException = {
  error?: string;
  code?: number;
};
export type AuthorizationException = {
  error?: string;
  code?: number;
};
export type ValidationException = {
  error?: object;
  code?: number;
};
export type UpdateCountryRequest = {
  name?: string | null;
  short_name?: string | null;
  phone_code?: string | null;
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export type StoreCountryRequest = {
  name: string;
  short_name: string;
  phone_code: string;
};
export const {
  useGetCountryByIdQuery,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  useGetAllCountriesQuery,
  useSaveCountryMutation,
} = injectedRtkApi;
