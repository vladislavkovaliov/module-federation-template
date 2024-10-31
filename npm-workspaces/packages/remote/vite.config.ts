import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remove_app",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./HostButton": "./src/components/HostButton",
        "./PlainButton": "./src/components/PlainButton",
      },
      shared: ["react"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
