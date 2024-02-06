import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Users"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.user}`,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        providesTags: ["Users"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.user}`,
          method: "PUT",
          body: queryArg.updateUserRequest,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Users"],
      }),
      deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.user}`,
          method: "DELETE",
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Users"],
      }),
      getAllUser: build.query<GetAllUserApiResponse, GetAllUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
            lang: queryArg.lang,
            id: queryArg.id,
            status: queryArg.status,
            name: queryArg.name,
            email: queryArg.email,
            username: queryArg.username,
          },
        }),
        providesTags: ["Users"],
      }),
      saveUser: build.mutation<SaveUserApiResponse, SaveUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users`,
          method: "POST",
          body: queryArg.storeUserRequest,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Users"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetUserByIdApiResponse = /** status 200 success */ {
  data?: User;
};
export type GetUserByIdApiArg = {
  /** Id of user */
  user: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
};
export type UpdateUserApiResponse = /** status 200 success */ {
  data?: User;
};
export type UpdateUserApiArg = {
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
  /** Id of user */
  user: number;
  updateUserRequest: UpdateUserRequest;
};
export type DeleteUserApiResponse = /** status 200 success */ {
  data?: User;
};
export type DeleteUserApiArg = {
  /** Id of user */
  user: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
};
export type GetAllUserApiResponse = /** status 200 success */ {
  data?: User[];
  meta?: Pagination;
};
export type GetAllUserApiArg = {
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
  /** Code of language */
  lang?: string;
  id?: number;
  status?: number;
  name?: string;
  email?: string;
  username?: string;
};
export type SaveUserApiResponse = /** status 200 success */ {
  data?: User;
};
export type SaveUserApiArg = {
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
  storeUserRequest: StoreUserRequest;
};
export type Status = {
  id: number;
  name: string;
  type: string;
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
export type SocialNetwork = {
  id: number;
  provider: string;
  provider_id: string;
  avatar: string;
};
export type User = {
  id: number;
  name: string;
  email?: string;
  username?: string;
  status?: Status;
  roles?: Role[];
  social_networks?: SocialNetwork[];
};
export type AuthenticationException = {
  error?: string;
  code?: number;
};
export type AuthorizationException = {
  error?: string;
  code?: number;
};
export type ModelNotFoundException = {
  error?: string;
  code?: number;
};
export type BadRequestException = {
  error?: string;
  code?: number;
};
export type ValidationException = {
  error?: object;
  code?: number;
};
export type UpdateUserRequest = {
  name?: string;
  username?: string;
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export type StoreUserRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  role: number;
};
export const {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useSaveUserMutation,
} = injectedRtkApi;
