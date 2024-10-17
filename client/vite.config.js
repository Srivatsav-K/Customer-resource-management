import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3050",
        changeOrigin: true,
      },
    },
  },
});
