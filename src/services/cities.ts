import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Cities"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCityById: build.query<GetCityByIdApiResponse, GetCityByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/cities/${queryArg.city}`,
          params: { include: queryArg.include },
        }),
        providesTags: ["Cities"],
      }),
      updateCity: build.mutation<UpdateCityApiResponse, UpdateCityApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/cities/${queryArg.city}`,
          method: "PUT",
          body: queryArg.updateCityRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Cities"],
      }),
      deleteCity: build.mutation<DeleteCityApiResponse, DeleteCityApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/cities/${queryArg.city}`,
          method: "DELETE",
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Cities"],
      }),
      getAllCities: build.query<GetAllCitiesApiResponse, GetAllCitiesApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/cities`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
          },
        }),
        providesTags: ["Cities"],
      }),
      saveCity: build.mutation<SaveCityApiResponse, SaveCityApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/cities`,
          method: "POST",
          body: queryArg.storeCityRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Cities"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetCityByIdApiResponse = /** status 200 success */ {
  data?: City;
};
export type GetCityByIdApiArg = {
  /** Id of city */
  city: number;
  /** Relationships of resource */
  include?: string;
};
export type UpdateCityApiResponse = /** status 200 success */ {
  data?: City;
};
export type UpdateCityApiArg = {
  /** Id of city */
  city: number;
  /** Relationships of resource */
  include?: string;
  updateCityRequest: UpdateCityRequest;
};
export type DeleteCityApiResponse = /** status 200 success */ {
  data?: City;
};
export type DeleteCityApiArg = {
  /** Id of city */
  city: number;
  /** Relationships of resource */
  include?: string;
};
export type GetAllCitiesApiResponse = /** status 200 success */ {
  data?: City[];
  meta?: Pagination;
};
export type GetAllCitiesApiArg = {
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
export type SaveCityApiResponse = /** status 200 success */ {
  data?: City;
};
export type SaveCityApiArg = {
  /** Relationships of resource */
  include?: string;
  storeCityRequest: StoreCityRequest;
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
export type State = {
  id: number;
  name: string;
  status?: Status;
  country?: Country;
};
export type City = {
  id: number;
  name: string;
  status?: Status;
  state?: State;
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
export type UpdateCityRequest = {
  name?: string | null;
  state_id?: number | null;
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export type StoreCityRequest = {
  name: string;
  state_id: number;
};
export const {
  useGetCityByIdQuery,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetAllCitiesQuery,
  useSaveCityMutation,
} = injectedRtkApi;
