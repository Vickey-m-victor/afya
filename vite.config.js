import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    proxy: {
      "/v2": {
        target:import.meta.env.VITE_APP_BASE_URL,
        changeOrigin: true,
      },
      "/uploads": {
        target: import.meta.env.VITE_APP_BASE_URL, 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/uploads/, '/uploads'),
      },
    },
    cors: false,
  },
});
