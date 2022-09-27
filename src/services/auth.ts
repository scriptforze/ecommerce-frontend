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
        }),
        invalidatesTags: ["Auth"],
      }),
      signInOrSignUpWithSocialNetwork: build.mutation<
        SignInOrSignUpWithSocialNetworkApiResponse,
        SignInOrSignUpWithSocialNetworkApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/auth/${queryArg.provider}`,
          method: "POST",
          body: queryArg.providerAuthRequest,
        }),
        invalidatesTags: ["Auth"],
      }),
      signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/auth/register`,
          method: "POST",
          body: queryArg.registerAuthRequest,
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
  loginAuthRequest: LoginAuthRequest;
};
export type SignInOrSignUpWithSocialNetworkApiResponse =
  /** status 200 success */ {
    access_token?: string;
    token_type?: string;
  };
export type SignInOrSignUpWithSocialNetworkApiArg = {
  /** Provider name */
  provider: string;
  providerAuthRequest: ProviderAuthRequest;
};
export type SignUpApiResponse = /** status 200 success */ {
  access_token?: string;
  token_type?: string;
};
export type SignUpApiArg = {
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
  useSignInOrSignUpWithSocialNetworkMutation,
  useSignUpMutation,
} = injectedRtkApi;
