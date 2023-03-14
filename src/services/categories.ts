import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Categories"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCategoryById: build.query<
        GetCategoryByIdApiResponse,
        GetCategoryByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/categories/${queryArg.category}`,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        providesTags: ["Categories"],
      }),
      updateCategory: build.mutation<
        UpdateCategoryApiResponse,
        UpdateCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/categories/${queryArg.category}`,
          method: "PUT",
          body: queryArg.updateCategoryRequest,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Categories"],
      }),
      deleteCategory: build.mutation<
        DeleteCategoryApiResponse,
        DeleteCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/categories/${queryArg.category}`,
          method: "DELETE",
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        invalidatesTags: ["Categories"],
      }),
      getAllCategories: build.query<
        GetAllCategoriesApiResponse,
        GetAllCategoriesApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/categories`,
          params: {
            include: queryArg.include,
            search: queryArg.search,
            per_page: queryArg.perPage,
            page: queryArg.page,
            sort_by: queryArg.sortBy,
            lang: queryArg.lang,
            exclude_id: queryArg.excludeId,
          },
        }),
        providesTags: ["Categories"],
      }),
      saveCategory: build.mutation<SaveCategoryApiResponse, SaveCategoryApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/categories`,
            method: "POST",
            body: queryArg.storeCategoryRequest,
            params: { include: queryArg.include, lang: queryArg.lang },
          }),
          invalidatesTags: ["Categories"],
        }
      ),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type GetCategoryByIdApiResponse = /** status 200 success */ {
  data?: Category;
};
export type GetCategoryByIdApiArg = {
  /** Id of category */
  category: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
};
export type UpdateCategoryApiResponse = /** status 200 success */ {
  data?: Category;
};
export type UpdateCategoryApiArg = {
  /** Id of category */
  category: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
  updateCategoryRequest: UpdateCategoryRequest;
};
export type DeleteCategoryApiResponse = /** status 200 success */ {
  data?: Category;
};
export type DeleteCategoryApiArg = {
  /** Id of category */
  category: number;
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
};
export type GetAllCategoriesApiResponse = /** status 200 success */ {
  data?: Category[];
  meta?: Pagination;
};
export type GetAllCategoriesApiArg = {
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
  /** Category id to exclude */
  excludeId?: number;
};
export type SaveCategoryApiResponse = /** status 200 success */ {
  data?: Category;
};
export type SaveCategoryApiArg = {
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
  storeCategoryRequest: StoreCategoryRequest;
};
export type Status = {
  id: number;
  name: string;
  type: string;
};
export type ResourceUrls = {
  original: string;
  thumb?: string;
  small?: string;
  medium?: string;
};
export type Resource = {
  id: number;
  owner_id?: number;
  type_resource?: string;
  urls: ResourceUrls;
  options?: object;
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  parent_id?: number;
  status?: Status;
  image?: Resource;
  children?: Category[];
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
export type UpdateCategoryRequest = {
  name?: string;
  image?: number;
  parent_id?: number;
};
export type Pagination = {
  current_page?: number;
  from?: number;
  last_page?: number;
  per_page?: number;
  to?: number;
  total?: number;
};
export type StoreCategoryRequest = {
  name: string;
  image: number;
  parent_id?: number;
};
export const {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useSaveCategoryMutation,
} = injectedRtkApi;
