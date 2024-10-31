import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        remoteApp: "http://localhost:4173/assets/remoteEntry.js",
      },
      // WARN: to sync ./packages/remote/vite.config.ts
      shared: ["react"],
    }),
  ],
  build: {
    modulePreload: false,
    minify: false,
  },
});
