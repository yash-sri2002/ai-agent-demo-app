import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Port 3000 matches ai-agent-demo-automation's playwright.config.ts baseURL.
// The /api proxy forwards to the small Express server in server/index.ts -
// Vite only serves the frontend, it has no backend of its own.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
