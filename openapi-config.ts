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
    "./src/services/productAttributes.ts": {
      filterEndpoints: [
        "getAllProductAttributes",
        "getProductAttributeById",
        "saveProductAttribute",
        "updateProductAttribute",
        "deleteProductAttribute",
      ],
    },
    "./src/services/categories.ts": {
      filterEndpoints: [/categories/i, /category/i],
    },
    "./src/services/tags.ts": {
      filterEndpoints: [/tags/i, /tag/i],
    },
    "./src/services/countries.ts": {
      filterEndpoints: [/countries/i, /country/i],
    },
    "./src/services/states.ts": {
      filterEndpoints: [/states/i, /state/i],
    },
    "./src/services/cities.ts": {
      filterEndpoints: [/cities/i, /city/i],
    },
    "./src/services/products.ts": {
      filterEndpoints: [
        "saveProductGeneral",
        "updateProductGeneral",
        "finishProduct",
      ],
    },
    "./src/services/productsStocks.ts": {
      filterEndpoints: ["saveProductStockByProduct"],
    },
    "./src/services/productAttributeOptions.ts": {
      filterEndpoints: ["getAllProductAttributeOptionsByProductAttribute"],
    },
    "./src/services/resources.ts": {
      filterEndpoints: ["saveResource"],
    },
  },
  hooks: true,
  tag: true,
};

export default config;
