import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/ecommerce-frontend/",
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    react({
      babel: {
        presets: ["@babel/preset-typescript"],
        plugins: [
          "@babel/plugin-transform-typescript",
          [
            "babel-plugin-styled-components",
            {
              ssr: false,
              pure: true,
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
  ],
});
