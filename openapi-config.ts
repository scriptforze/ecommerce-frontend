import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "https://ecommerceapi.scriptforze.com/docs/api-docs.json",
  apiFile: "./src/store/ecommerceApi.ts",
  apiImport: "ecommerceApi",
  exportName: "ecommerceApi",
  outputFiles: {
    "./src/services/auth.ts": {
      filterEndpoints: [
        "signIn",
        "getAuthUser",
        "signUp",
        "signInOrSignUpWithSocialNetwork",
      ],
    },
    "./src/services/categories.ts": {
      filterEndpoints: [/categories/i, /category/i],
    },
  },
  hooks: true,
  tag: true,
};

export default config;
