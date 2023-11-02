import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const API_ENDPOINT = "http://localhost:3000";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    cors: true,
    proxy: {
      "/api": {
        target: API_ENDPOINT,
        changeOrigin: true,
      },
      "/api-json": {
        target: API_ENDPOINT,
        changeOrigin: true,
      },
    },
  },
});
