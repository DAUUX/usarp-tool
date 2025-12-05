import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";
import path from "path"; // Import necessário para o alias funcionar bem

export default ({ mode }) => {
  const env = dotenv.config({ path: `./.env.${mode}` }).parsed;

  return defineConfig({
    base: "/",
    plugins: [svgr(), react()],

    resolve: {
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc",
      },
    },

    server: {
      port: env?.PORT || 3000,
      strictPort: true,
      host: true,
      origin: env?.ORIGIN || "http://localhost:3000",
    },
    preview: {
      port: env?.PREVIEW_PORT || 3000,
      strictPort: true,
    },
    define: {
      "process.env.BASE_URL": JSON.stringify(env?.BASE_URL),
    },
    test: {
      global: true,
      environment: "jsdom",
      setupFiles: "./.storybook/vitest.setup.js",
    },
  });
};
