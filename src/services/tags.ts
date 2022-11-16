import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Tags"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTagById: build.query<GetTagByIdApiResponse, GetTagByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/tags/${queryArg.tag}`,
          params: { include: queryArg.include },
        }),
        providesTags: ["Tags"],
      }),
      updateTag: build.mutation<UpdateTagApiResponse, UpdateTagApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/tags/${queryArg.tag}`,
          method: "PUT",
          body: queryArg.updateTagRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Tags"],
      }),
      deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/tags/${queryArg.tag}`,
          method: "DELETE",
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Tags"],
      }),
      getAllTags: build.query<GetAllTagsApiResponse, GetAllTagsApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/tags`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
          },
        }),
        providesTags: ["Tags"],
      }),
      saveTag: build.mutation<SaveTagApiResponse, SaveTagApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/tags`,
          method: "POST",
          body: queryArg.storeTagRequest,
          params: { include: queryArg.include },
        }),
        invalidatesTags: ["Tags"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetTagByIdApiResponse = /** status 200 success */ {
  data?: Tag;
};
export type GetTagByIdApiArg = {
  /** Id of tag */
  tag: number;
  /** Relationships of resource */
  include?: string;
};
export type UpdateTagApiResponse = /** status 200 success */ {
  data?: Tag;
};
export type UpdateTagApiArg = {
  /** Id of tag */
  tag: number;
  /** Relationships of resource */
  include?: string;
  updateTagRequest: UpdateTagRequest;
};
export type DeleteTagApiResponse = /** status 200 success */ {
  data?: Tag;
};
export type DeleteTagApiArg = {
  /** Id of tag */
  tag: number;
  /** Relationships of resource */
  include?: string;
};
export type GetAllTagsApiResponse = /** status 200 success */ {
  data?: Tag[];
  meta?: Pagination;
};
export type GetAllTagsApiArg = {
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
export type SaveTagApiResponse = /** status 200 success */ {
  data?: Tag;
};
export type SaveTagApiArg = {
  /** Relationships of resource */
  include?: string;
  storeTagRequest: StoreTagRequest;
};
export type Status = {
  id: number;
  name: string;
  type: string;
};
export type Tag = {
  id: number;
  name: string;
  slug: string;
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
export type UpdateTagRequest = {
  name?: string | null;
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export type StoreTagRequest = {
  name: string;
};
export const {
  useGetTagByIdQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useGetAllTagsQuery,
  useSaveTagMutation,
} = injectedRtkApi;
