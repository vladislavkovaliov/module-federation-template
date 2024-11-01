import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

const deps = require("./package.json").dependencies
console.log(deps)
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        // "./HostButton": "./src/components/HostButton",
        "./PlainButton": "./src/components/PlainButton",
      },
      remotes: {
        widgets: {
          /**
           * Для локальной разработки нужно раскоментить
           */
          external: "http://localhost:3000/__federated/remoteEntry.js",
          externalType: 'url',
          format: 'var',
          from: 'webpack',
        },
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true,
        }
      }
    }),
  ],
})
