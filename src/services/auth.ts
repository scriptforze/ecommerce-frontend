import { ecommerceApi as api } from "../store/ecommerceApi";
export const addTagTypes = ["Auth"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      signIn: build.mutation<SignInApiResponse, SignInApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/auth/login`,
          method: "POST",
          body: queryArg.loginAuthRequest,
          params: { lang: queryArg.lang },
        }),
        invalidatesTags: ["Auth"],
      }),
      getAuthUser: build.query<GetAuthUserApiResponse, GetAuthUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/auth/me`,
          params: { include: queryArg.include, lang: queryArg.lang },
        }),
        providesTags: ["Auth"],
      }),
      signInOrSignUpWithSocialNetwork: build.mutation<
        SignInOrSignUpWithSocialNetworkApiResponse,
        SignInOrSignUpWithSocialNetworkApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/auth/${queryArg.provider}`,
          method: "POST",
          body: queryArg.providerAuthRequest,
          params: { lang: queryArg.lang },
        }),
        invalidatesTags: ["Auth"],
      }),
      signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/auth/register`,
          method: "POST",
          body: queryArg.registerAuthRequest,
          params: { lang: queryArg.lang },
        }),
        invalidatesTags: ["Auth"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as ecommerceApi };
export type SignInApiResponse = /** status 200 success */ {
  access_token?: string;
  token_type?: string;
};
export type SignInApiArg = {
  /** Code of language */
  lang?: string;
  loginAuthRequest: LoginAuthRequest;
};
export type GetAuthUserApiResponse = /** status 200 success */ {
  data?: User;
};
export type GetAuthUserApiArg = {
  /** Relationships of resource */
  include?: string;
  /** Code of language */
  lang?: string;
};
export type SignInOrSignUpWithSocialNetworkApiResponse =
  /** status 200 success */ {
    access_token?: string;
    token_type?: string;
  };
export type SignInOrSignUpWithSocialNetworkApiArg = {
  /** Provider name */
  provider: string;
  /** Code of language */
  lang?: string;
  providerAuthRequest: ProviderAuthRequest;
};
export type SignUpApiResponse = /** status 200 success */ {
  access_token?: string;
  token_type?: string;
};
export type SignUpApiArg = {
  /** Code of language */
  lang?: string;
  registerAuthRequest: RegisterAuthRequest;
};
export type BadRequestException = {
  error?: string;
  code?: number;
};
export type ValidationException = {
  error?: object;
  code?: number;
};
export type LoginAuthRequest = {
  username: string;
  password: string;
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
export type ProviderAuthRequest = {
  token: string;
};
export type RegisterAuthRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};
export const {
  useSignInMutation,
  useGetAuthUserQuery,
  useSignInOrSignUpWithSocialNetworkMutation,
  useSignUpMutation,
} = injectedRtkApi;
