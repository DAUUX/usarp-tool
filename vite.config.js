import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

export default ({ mode }) => {
  // Carrega variáveis de ambiente correspondentes ao modo
  const env = dotenv.config({ path: `./.env.${mode}` }).parsed;

  return defineConfig({
    base: "/",
    plugins: [svgr(), react()],
    server: {
      port: env.PORT || 3000, // Usa a porta definida nas variáveis de ambiente ou 3000 por padrão
      strictPort: true,
      host: true,
      origin: env.ORIGIN || "http://localhost:3000", // Usa o origin definido nas variáveis de ambiente ou localhost:3000 por padrão
    },
    // Configuração da visualização
    preview: {
      port: env.PREVIEW_PORT || 3000, // Usa a porta definida nas variáveis de ambiente ou 3001 por padrão
      strictPort: true,
    },
    define: {
      "process.env.BASE_URL": JSON.stringify(env.BASE_URL),
    },

    //testes
    test: {
      global: true,
      environment: "jsdom",
      setupFiles: "./.storybook/vitest.setup.js",
    },
  });
};
