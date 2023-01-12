import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Resources"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      saveResource: build.mutation<SaveResourceApiResponse, SaveResourceApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/resources`,
            method: "POST",
            body: queryArg.storeResourceDto,
          }),
          invalidatesTags: ["Resources"],
        }
      ),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type SaveResourceApiResponse = /** status 200 success */ {
  data?: Resource;
};
export type SaveResourceApiArg = {
  storeResourceDto: StoreResourceDto;
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
export type StoreResourceDto = {
  file: Blob;
};
export const { useSaveResourceMutation } = injectedRtkApi;
