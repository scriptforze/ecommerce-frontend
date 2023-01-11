import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["States"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getStateById: build.query<GetStateByIdApiResponse, GetStateByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/states/${queryArg.state}`,
          params: { include: queryArg.include },
        }),
        providesTags: ["States"],
      }),
      updateState: build.mutation<UpdateStateApiResponse, UpdateStateApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/states/${queryArg.state}`,
          method: "PUT",
          body: queryArg.updateStateRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["States"],
      }),
      deleteState: build.mutation<DeleteStateApiResponse, DeleteStateApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/states/${queryArg.state}`,
          method: "DELETE",
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["States"],
      }),
      getAllStates: build.query<GetAllStatesApiResponse, GetAllStatesApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/states`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
          },
        }),
        providesTags: ["States"],
      }),
      saveState: build.mutation<SaveStateApiResponse, SaveStateApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/states`,
          method: "POST",
          body: queryArg.storeStateRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["States"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetStateByIdApiResponse = /** status 200 success */ {
  data?: State;
};
export type GetStateByIdApiArg = {
  /** Id of state */
  state: number;
  /** Relationships of resource */
  include?: string;
};
export type UpdateStateApiResponse = /** status 200 success */ {
  data?: State;
};
export type UpdateStateApiArg = {
  /** Id of state */
  state: number;
  /** Relationships of resource */
  include?: string;
  updateStateRequest: UpdateStateRequest;
};
export type DeleteStateApiResponse = /** status 200 success */ {
  data?: State;
};
export type DeleteStateApiArg = {
  /** Id of state */
  state: number;
  /** Relationships of resource */
  include?: string;
};
export type GetAllStatesApiResponse = /** status 200 success */ {
  data?: State[];
  meta?: Pagination;
};
export type GetAllStatesApiArg = {
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
export type SaveStateApiResponse = /** status 200 success */ {
  data?: State;
};
export type SaveStateApiArg = {
  /** Relationships of resource */
  include?: string;
  storeStateRequest: StoreStateRequest;
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
export type UpdateStateRequest = {
  name?: string | null;
  country_id?: number | null;
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export type StoreStateRequest = {
  name: string;
  country_id: number;
};
export const {
  useGetStateByIdQuery,
  useUpdateStateMutation,
  useDeleteStateMutation,
  useGetAllStatesQuery,
  useSaveStateMutation,
} = injectedRtkApi;
