import type { ConfigFile } from "@rtk-query/codegen-openapi";
import * as dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/.env` });

const config: ConfigFile = {
  schemaFile: `${process.env.VITE_BASE_URL_API}/docs/api-docs.json`,
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
