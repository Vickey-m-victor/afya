import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  // ✅ load .env variables
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("./modules", import.meta.url)),
        "#": fileURLToPath(new URL("./app", import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        "/v2": {
          target: env.VITE_APP_BASE_URL, // ✅ now works
          changeOrigin: true,
        },
        "/uploads": {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
        },
      },
      cors: false,
    },
  };
});