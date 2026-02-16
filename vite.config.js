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
      "/v1": {
        target: "http://localhost:8086/", //backend URL
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:8086/", 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/uploads/, '/uploads'),
      },
    },
    cors: true,
  },
});
