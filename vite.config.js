import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

// Load configuration from afya365.cfg
dotenv.config({ path: "./afya365.cfg" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./modules", import.meta.url)),
    },
  },
  server: {
    host: true,
    proxy: {
      "/v2": {
        target: process.env.API_BASE_URL || "http://localhost:8086/",
        changeOrigin: true,
      },

    },
    cors: false,
  },
});
